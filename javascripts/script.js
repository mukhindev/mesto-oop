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
const popupButtonsClose = document.querySelectorAll('.popup__close-button')

// Форма профиля
const formProfile = popupProfile.querySelector('.popup__form')
const formInputProfileName = formProfile.querySelector('.popup__input_value_profile-name')
const formInputProfileAbout = formProfile.querySelector('.popup__input_value_profile-about')

// Форма добавления места
const formPlace = popupPlace.querySelector('.popup__form')
const formInputPlaceName = formPlace.querySelector('.popup__input_value_place-name')
const formInputPlacePhoto = formPlace.querySelector('.popup__input_value_place-photo')

// Lightbox
const lightboxPhoto = popupLightbox.querySelector('.popup__lightbox-photo')
const lightboxLabel = popupLightbox.querySelector('.popup__lightbox-label')

// Сетка карточек мест
const places = document.querySelector('.places')

// Шаблон #place
const templatePlaceCard = document.querySelector('#place').content

// Функция: Формирование карточки
function createPlaceCard({ name, link }) {
  const placeCard = templatePlaceCard.cloneNode(true)
  const placeName = placeCard.querySelector('.place__name')
  const placeImage = placeCard.querySelector('.place__photo')
  placeImage.style.backgroundImage = `url("${link}")`
  placeName.textContent = name
  placeImage.dataset.name = name
  placeImage.dataset.link = link
  return placeCard
}

// Функция: Добавление карточки в .places
function addPlaceCardInPlaces({ name, link }) {
  const card = createPlaceCard({ name, link })
  places.prepend(card)
}

// Функция: Вывод карточек мест
initialPlaces.forEach(place => {
  addPlaceCardInPlaces(place)
})

// Функция: Показать попап
function showPopup(popup) {
  popup.classList.add('popup_opened')
}

// Функция: Закрыть всплывающее окно
function closePopup(popup) {
  let target
  if (popup.target) {
    target = popup.target.closest('.popup_opened')
  } else {
    target = popup
  }
  target.classList.remove('popup_opened')
}

// Функция: открывает всплавающее окно и заносит в форму текщие данные
function showPopupProfile() {
  formInputProfileName.value = userProfileName.textContent
  formInputProfileAbout.value = userProfileAbout.textContent
  showPopup(popupProfile)
}

// Функция: открывает всплавающее окно и заносит в форму текщие данные
function showPopupPlace() {
  formInputPlaceName.value = ''
  formInputPlacePhoto.value = ''
  showPopup(popupPlace)
}

// Функция: Применить изменения профиля
function applyСhangesProfile(evt) {
  evt.preventDefault()
  userProfileName.textContent = formInputProfileName.value
  userProfileAbout.textContent = formInputProfileAbout.value
  closePopup(popupProfile)
}

// Функция: Создание новой карточки
function addPlaceCard(evt) {
  evt.preventDefault()
  const place = {
    name: formInputPlaceName.value,
    link: formInputPlacePhoto.value
  }
  const card = createPlaceCard(place)
  places.prepend(card)
  closePopup(popupPlace)
}

// Функция: Отобразить фото
function openPhoto(evt) {
  const photoLink = evt.target.dataset.link
  lightboxPhoto.src = photoLink
  lightboxLabel.textContent = evt.target.dataset.name
  showPopup(popupLightbox)
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
userProfileButtonEdit.addEventListener('click', showPopupProfile)
userProfileButtonAddPlace.addEventListener('click', showPopupPlace)
popupButtonsClose.forEach(button => button.addEventListener('click', closePopup))
formProfile.addEventListener('submit', applyСhangesProfile)
formPlace.addEventListener('submit', addPlaceCard)
places.addEventListener('click', listenPlaceСard)
