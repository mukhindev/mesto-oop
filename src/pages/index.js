import './index.css'
import {
  initialPlaces,
  userProfileButtonAddPlace,
  userProfileButtonEdit,
  nameSelector,
  aboutSelector,
  placesContainerSelector,
  placeTemplateSelector,
  popupImageSelector,
  popupPlaceSelector,
  popupProfileSelector
} from '../utils/constants.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import FormValidator from '../components/FormValidator.js'
import { optionsValidate } from '../utils/utils.js'

// Объявление пользовательского события, для отслеживания появления формы
const eventShowForm = new CustomEvent('showForm')

// Попап с фото места
const popupPhoto = new PopupWithImage(popupImageSelector)

// Активация слушателей попапа с фото места
popupPhoto.setEventListeners()

// Получение элемента карточки места
const getCardElement = ({ name, link }) => {
  const card = new Card({
    cardSelector: placeTemplateSelector,
    data: { name, link },
    handleCardClick: () => {
      popupPhoto.open({ name, link })
    }
  })
  return card.generateCard()
}

// Формирование первоначальных карточек мест
const cards = new Section({
  containerSelector: placesContainerSelector,
  items: initialPlaces,
  renderer: ({ name, link }) => {
    const cardElement = getCardElement({ name, link })
    cards.addItem(cardElement)
  }
})

// Вывод первоначальных карточек мест
cards.renderItems()

// Попап с формой нового места
const popupPlace = new PopupWithForm({
  popupSelector: popupPlaceSelector,
  handleFormSubmit: (formData) => {
    const {
      popupInputPlaceName: name,
      popupInputPlacePhoto: link
    } = formData
    const cardElement = getCardElement({ name, link })
    cards.addItem(cardElement)
  }
})

// Активация слушателей попапа с формой нового места
popupPlace.setEventListeners()

// Валидация формы нового места
const validateformPlace = new FormValidator(
  optionsValidate,
  popupPlace.getForm()
)
validateformPlace.enableValidation()

// Данные пользователя
const user = new UserInfo({
  nameSelector,
  aboutSelector
})

// Попап с формой профиля
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (formData) => {
    const {
      popupInputProfileName: name,
      popupInputProfileAbout: about
    } = formData
    user.setUserInfo({ name, about })
  }
})

// Активация слушателей попапа с формой профиля
popupProfile.setEventListeners()

// Валидация формы профиля
const validateformProfile = new FormValidator(
  optionsValidate,
  popupProfile.getForm()
)
validateformProfile.enableValidation()

// Отобразить попап с формой нового места
function showPopupPlace () {
  popupPlace.open({
    // Событие которое произойдёт при открытии
    event: eventShowForm
  })
}

// Отобразить попап с формой профиля
function showPopupProfile () {
  const userInfo = user.getUserInfo()
  popupProfile.open({
    // Передаётся name и about в поля формы
    data: {
      popupInputProfileName: userInfo.name,
      popupInputProfileAbout: userInfo.about
    },
    // Событие которое произойдёт при открытии
    event: eventShowForm
  })
}

// Слушатели кнопок
userProfileButtonAddPlace.addEventListener('click', showPopupPlace)
userProfileButtonEdit.addEventListener('click', showPopupProfile)
