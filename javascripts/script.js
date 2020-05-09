const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name')
const profileAbout = profile.querySelector('.profile__about')
const profileButtonEdit = document.querySelector('.profile__edit-button')

const popup = document.querySelector('.popup')
const popupForm = popup.querySelector('.popup__form')
const popupButtonClose = popup.querySelector('.popup__close-button')

const popupInputName = popupForm.querySelector('.popup__input-name')
const popupInputAbout = popupForm.querySelector('.popup__input-about')

popupInputName.value = profileName.textContent
popupInputAbout.value = profileAbout.textContent

function showPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

profileButtonEdit.addEventListener('click', function() {
  showPopup()
})

popupButtonClose.addEventListener('click', function() {
  closePopup()
})

popupForm.addEventListener('submit', function(e) {
  e.preventDefault()
  profileName.textContent = popupInputName.value
  profileAbout.textContent = popupInputAbout.value
  closePopup()
})
