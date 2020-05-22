const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Элементы профиля
const userProfile = document.querySelector('.profile')
const userProfileName = userProfile.querySelector('.profile__name')
const userProfileAbout = userProfile.querySelector('.profile__about')
const userProfileButtonEdit = userProfile.querySelector('.profile__edit-button')
const userProfileButtonAddPlace = userProfile.querySelector('.profile__add-button')

// Попапы
const popupProfile = document.querySelector('.popup_profile')
const popupPlace = document.querySelector('.popup_place')

// Форма профиля
const formProfile = popupProfile.querySelector('.popup__form')
const formInputProfileName = formProfile.querySelector('.popup__input_value_profile-name')
const formInputProfileAbout = formProfile.querySelector('.popup__input_value_profile-about')
const formButtonProfileClose = popupProfile.querySelector('.popup__close-button')

// Форма добавления места
const formPlace = popupPlace.querySelector('.popup__form')
const formInputPlaceName = formPlace.querySelector('.popup__input_value_place-name')
const formInputPlacePhoto = formPlace.querySelector('.popup__input_value_place-photo')
const formButtonPlaceClose = popupPlace.querySelector('.popup__close-button')

// Элементы мест
const places = document.querySelector('.places')

// Шаблон #place
const templatePlaceCard = document.querySelector('#place').content

// Вывод карточек мест
initialPlaces.forEach(place => {
  const placeCard = templatePlaceCard.cloneNode(true)
  const placeImage = placeCard.querySelector('.place__photo')
  const placeName = placeCard.querySelector('.place__name')
  placeImage.style.backgroundImage = `url("${place.link}")`
  placeName.textContent = place.name
  places.append(placeCard)
})

// Фукнция: открывает всплавающее окно и заносит в форму текщие данные
function showPopup() {
  formInputProfileName.value = userProfileName.textContent
  formInputProfileAbout.value = userProfileAbout.textContent
  popupProfile.classList.add('popup_opened')
}

// Фукнция: открывает всплавающее окно и заносит в форму текщие данные
function showPopupPlace() {
  formInputPlaceName.value = ''
  formInputPlacePhoto.value = ''
  popupPlace.classList.add('popup_opened')
}

// Фукнция: закрывает всплавающее окно
function closePopup() {
  popupProfile.classList.remove('popup_opened')
  popupPlace.classList.remove('popup_opened')
}

// Функция: применяет изнения профиля
function applyСhanges(evt) {
  evt.preventDefault()
  userProfileName.textContent = formInputProfileName.value
  userProfileAbout.textContent = formInputProfileAbout.value
  closePopup()
}

// Функция: Отобразить фото
function openPhoto(evt) {
  const photoLink = evt.target.src
  console.log(photoLink)
}

// Функция: Поставить/Снять лайк
function toggleLike(evt) {
  const placeName = evt.target.previousElementSibling.textContent
  const placeId = initialPlaces.findIndex(place => place.name === placeName)
  console.log(placeId)
}

// Функция: Отслеживание кликов по изображению и лайку
function listenPlaceСard(evt) {
  if (evt.target.classList.contains("place__photo")) openPhoto(evt)
  if (evt.target.classList.contains("place__like")) toggleLike(evt)
}

// Слушатели
userProfileButtonEdit.addEventListener('click', showPopup)
userProfileButtonAddPlace.addEventListener('click', showPopupPlace)
formButtonProfileClose.addEventListener('click', closePopup)
formButtonPlaceClose.addEventListener('click', closePopup)
formProfile.addEventListener('submit', applyСhanges)
places.addEventListener('click', listenPlaceСard)
