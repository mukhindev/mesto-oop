// Элементы профиля
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name')
const profileAbout = profile.querySelector('.profile__about')
const profileButtonEdit = profile.querySelector('.profile__edit-button')

// Элементы всплывающего окна
const popup = document.querySelector('.popup')
const popupForm = popup.querySelector('.popup__form')
const popupButtonClose = popup.querySelector('.popup__close-button')
const popupInputName = popupForm.querySelector('.popup__input_value_name')
const popupInputAbout = popupForm.querySelector('.popup__input_value_about')

// Фукнция: открывает всплавающее окно и заносит в форму текщие данные
function showPopup() {
  popupInputName.value = profileName.textContent
  popupInputAbout.value = profileAbout.textContent
  popup.classList.add('popup_opened')
}

// Фукнция: закрывает всплавающее окно
function closePopup() {
  popup.classList.remove('popup_opened')
}

// Функция: применяет изнения профиля
function applyСhanges(e) {
  e.preventDefault()
  profileName.textContent = popupInputName.value
  profileAbout.textContent = popupInputAbout.value
  closePopup()
}

// Слушатели
profileButtonEdit.addEventListener('click', showPopup)
popupButtonClose.addEventListener('click', closePopup)
popupForm.addEventListener('submit', applyСhanges)
