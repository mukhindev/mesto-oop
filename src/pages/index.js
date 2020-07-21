import './index.css'
import {
  buttonEditProfileSelector,
  buttonAddPlaceSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
  placesContainerSelector,
  placeTemplateSelector,
  popupImageSelector,
  popupPlaceSelector,
  popupProfileSelector,
  popupDeleteSelector
} from '../utils/constants.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithDelete from '../components/PopupWithDelete.js'
import FormValidator from '../components/FormValidator.js'
import { optionsValidate, configApi } from '../utils/utils.js'
import Api from '../components/Api.js'

// API
const api = new Api(configApi)

// Объявление пользовательского события, для отслеживания появления формы
const eventShowForm = new CustomEvent('showForm')

// Попап с фото места
const popupPhoto = new PopupWithImage(popupImageSelector)

// Активация слушателей попапа с фото места
popupPhoto.setEventListeners()

// Попап с удалением карточки
const popupDelete = new PopupWithDelete({
  popupSelector: popupDeleteSelector,
  handleButtonOk: ({ cardElement, cardId }) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove()
      })
  }
})

// Активация слушателей попапа c удалением
popupDelete.setEventListeners()

// Получение элемента карточки места
const getCardElement = (data, userData) => {
  const card = new Card({
    cardSelector: placeTemplateSelector,
    data,
    userData,
    handleCardClick: () => {
      popupPhoto.open(data)
    },
    handleCardDelete: ({ cardElement, cardId }) => {
      console.log('Удаление карточки', cardElement, cardId)
      popupDelete.open({ cardElement, cardId })
    }
  })
  return card.generateCard()
}

// Секция карточек
const cards = new Section({
  containerSelector: placesContainerSelector,
  renderer: (data, userData) => {
    const cardElement = getCardElement(data, userData)
    cards.addItem(cardElement)
  }
})

// Попап с формой нового места
const popupPlace = new PopupWithForm({
  popupSelector: popupPlaceSelector,
  handleFormSubmit: (formData) => {
    const {
      popupInputPlaceName: name,
      popupInputPlacePhoto: link
    } = formData
    api.createCard({ name, link })
      .then((data) => {
        console.log(data, user.getUserInfo())
        const cardElement = getCardElement(data, user.getUserInfo())
        cards.addItem(cardElement)
      })
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
  aboutSelector,
  avatarSelector
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
    api.updateMe({ name, about })
      .then((data) => {
        console.log('Обновление профиля', data)
      })
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
document.querySelector(buttonAddPlaceSelector).addEventListener('click', showPopupPlace)
document.querySelector(buttonEditProfileSelector).addEventListener('click', showPopupProfile)

// Инициализация профиля и карточек
Promise.all([api.getMe(), api.getCards()])
  .then(([ userData, cardsData ]) => {
    // Установка имени пользователя и о пользователе
    user.setUserInfo(userData)
    cards.renderItems(cardsData, userData)
  })
