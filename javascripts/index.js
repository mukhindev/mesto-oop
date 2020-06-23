import { optionsValidate } from './config.js'
import { initialPlaces } from './data.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

// Элементы профиля
const userProfile = document.querySelector('.profile')
const userProfileName = userProfile.querySelector('.profile__name')
const userProfileAbout = userProfile.querySelector('.profile__about')
const userProfileButtonEdit = userProfile.querySelector('.profile__edit-button')
const userProfileButtonAddPlace = userProfile.querySelector('.profile__add-button')

// Попапы
const popupProfile = document.querySelector('.popup_profile')
const popupPlace = document.querySelector('.popup_place')
const popupLightbox = document.querySelector('.popup_lightbox')
const popupButtonsClose = document.querySelectorAll('.popup__close-button')

// Форма профиля
const formProfile = popupProfile.querySelector('.popup__form')
const formInputProfileName = formProfile.querySelector('.popup__input_value_profile-name')
const formInputProfileAbout = formProfile.querySelector('.popup__input_value_profile-about')
const validateFormProfile = new FormValidator(optionsValidate, formProfile)
validateFormProfile.enableValidation()

// Форма добавления места
const formPlace = popupPlace.querySelector('.popup__form')
const formInputPlaceName = formPlace.querySelector('.popup__input_value_place-name')
const formInputPlacePhoto = formPlace.querySelector('.popup__input_value_place-photo')
const validateformPlace = new FormValidator(optionsValidate, formPlace)
validateformPlace.enableValidation()

// Lightbox
const lightboxPhoto = popupLightbox.querySelector('.popup__lightbox-photo')
const lightboxLabel = popupLightbox.querySelector('.popup__lightbox-label')

// Объявление пользовательского события
const eventShowForm = new CustomEvent('showForm')

// Функция: Закрыть попап по клику на оверлее
function closePopupByClickOverlay (e) {
  if (e.target.classList.contains('popup')) {
    closePopup(e.target)
  }
}

// Функция: Закрывать попап по клавише Esc
function closePopupByEsc (e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

// Функция: Показать попап
function showPopup (popup) {
  document.addEventListener('keydown', closePopupByEsc)
  popup.addEventListener('mousedown', closePopupByClickOverlay)
  popup.classList.add('popup_opened')
  // Если в попапе есть форма, на ней вызывается событие "showForm"
  if (popup.querySelector('.popup__form')) {
    popup.querySelector('.popup__form').dispatchEvent(eventShowForm)
  }
}

// Функция: Закрыть всплывающее окно
function closePopup (popup) {
  if (popup.target) popup = popup.target.closest('.popup')
  if (!popup.classList.contains('popup_opened')) return
  popup.classList.remove('popup_opened')
  popup.removeEventListener('mousedown', closePopupByClickOverlay)
  document.removeEventListener('keydown', closePopupByEsc)
}

// Функция: открывает всплавающее окно
function showPopupProfile () {
  formInputProfileName.value = userProfileName.textContent
  formInputProfileAbout.value = userProfileAbout.textContent
  showPopup(popupProfile)
}

// Функция: открывает всплавающее окно и заносит в форму текщие данные
function showPopupPlace () {
  formInputPlaceName.value = ''
  formInputPlacePhoto.value = ''
  showPopup(popupPlace)
}

// Функция: Применить изменения профиля
function applyСhangesProfile (e) {
  e.preventDefault()
  userProfileName.textContent = formInputProfileName.value
  userProfileAbout.textContent = formInputProfileAbout.value
  closePopup(popupProfile)
}

// Функция: Создание новой карточки
function addPlaceCard (e) {
  e.preventDefault()
  const place = {
    name: formInputPlaceName.value,
    link: formInputPlacePhoto.value
  }
  const card = new Card(place, '#place').generateCard()
  places.prepend(card)
  closePopup(popupPlace)
}

// Функция: Отобразить фото
export function openPhoto ({ name, link }) {
  lightboxPhoto.src = link
  lightboxPhoto.alt = `Фотография места ${name}`
  lightboxLabel.textContent = name
  showPopup(popupLightbox)
}

// Слушатели
userProfileButtonEdit.addEventListener('click', showPopupProfile)
userProfileButtonAddPlace.addEventListener('click', showPopupPlace)
popupButtonsClose.forEach(button => button.addEventListener('click', closePopup))
formProfile.addEventListener('submit', applyСhangesProfile)
formPlace.addEventListener('submit', addPlaceCard)

// Элемент вывода мест
const places = document.querySelector('.places')

// Функция: Вывод имеющихся карточек
function initRender () {
  initialPlaces.forEach(place => {
    const card = new Card(place, '#place').generateCard()
    places.append(card)
  })
}

// Инициализация
initRender()
