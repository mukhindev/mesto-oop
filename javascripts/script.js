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
const popupLightbox = document.querySelector('.popup_lightbox')

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

// Lightbox
const lightboxPhoto = popupLightbox.querySelector('.popup__lightbox-photo')
const lightboxLabel = popupLightbox.querySelector('.popup__lightbox-label')
const lightboxButtonClose = popupLightbox.querySelector('.popup__close-button')

// Сетка карточек мест
const places = document.querySelector('.places')

// Шаблон #place
const templatePlaceCard = document.querySelector('#place').content

// Добавление карточки места в .places
function addPlaceCard(name, link) {
  const placeCard = templatePlaceCard.cloneNode(true)
  const placeName = placeCard.querySelector('.place__name')
  const placeImage = placeCard.querySelector('.place__photo')
  placeName.textContent = name
  placeImage.style.backgroundImage = `url("${link}")`
  places.prepend(placeCard)
}

// Вывод карточек мест
initialPlaces.forEach(place => {
  addPlaceCard(place.name, place.link)
})

// Функция: открывает всплавающее окно и заносит в форму текщие данные
function showPopup() {
  formInputProfileName.value = userProfileName.textContent
  formInputProfileAbout.value = userProfileAbout.textContent
  popupProfile.classList.add('popup_opened')
}

// Функция: открывает всплавающее окно и заносит в форму текщие данные
function showPopupPlace() {
  formInputPlaceName.value = ''
  formInputPlacePhoto.value = ''
  popupPlace.classList.add('popup_opened')
}

// Функция: Закрыть всплывающее окно
function closePopup() {
  popupProfile.classList.remove('popup_opened')
  popupPlace.classList.remove('popup_opened')
  popupLightbox.classList.remove('popup_opened')
}

// Функция: Применить изменения профиля
function applyСhangesProfile(evt) {
  evt.preventDefault()
  userProfileName.textContent = formInputProfileName.value
  userProfileAbout.textContent = formInputProfileAbout.value
  closePopup()
}

// Функция: Приминить создание карточки
function createPlaceCard(evt) {
  evt.preventDefault()
  addPlaceCard(formInputPlaceName.value, formInputPlacePhoto.value) 
  closePopup()
}

// Функция: Отобразить фото
function openPhoto(evt) {
  const photoLink = evt.target.style.backgroundImage.replace(/^url[(]"|"[)]$/g, '')
  popupLightbox.classList.add('popup_opened')
  lightboxPhoto.src = photoLink
  lightboxLabel.textContent = evt.target.nextElementSibling.textContent
}

// Функция: Поставить/Снять лайк
function toggleLike(evt) {
  evt.target.classList.toggle('place__like_active')
}

// Функция: Удалить место
function deletePlace(evt) {
  evt.target.closest('.place').remove()
}

// Функция: Отслеживание кликов по фото, лайку и кнопке удалить на карточках
function listenPlaceСard(evt) {
  if (evt.target.classList.contains("place__photo")) openPhoto(evt)
  if (evt.target.classList.contains("place__like")) toggleLike(evt)
  if (evt.target.classList.contains("place__delete-button")) deletePlace(evt)
}

// Слушатели
userProfileButtonEdit.addEventListener('click', showPopup)
userProfileButtonAddPlace.addEventListener('click', showPopupPlace)
formButtonProfileClose.addEventListener('click', closePopup)
formButtonPlaceClose.addEventListener('click', closePopup)
lightboxButtonClose.addEventListener('click', closePopup)
formProfile.addEventListener('submit', applyСhangesProfile)
formPlace.addEventListener('submit', createPlaceCard)
places.addEventListener('click', listenPlaceСard)
