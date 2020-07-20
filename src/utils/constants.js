// Первоночальный массив данных
export const initialPlaces = [
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
]

// Элементы профиля
export const userProfileButtonEdit = document.querySelector('.profile__edit-button')
export const userProfileButtonAddPlace = document.querySelector('.profile__add-button')

// Селекторы профиля
export const nameSelector = '.profile__name'
export const aboutSelector = '.profile__about'
export const avatarSelector = '.profile__avatar'

// Селекторы карточек
export const placesContainerSelector = '.places'
export const placeTemplateSelector = '#place'

// Селекторы попапов
export const popupImageSelector = '.popup_lightbox'
export const popupPlaceSelector = '.popup_place'
export const popupProfileSelector = '.popup_profile'
