export const optionsValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const configApi = {
  hostname: 'https://mesto.nomoreparties.co/v1',
  cohort: 13,
  headers: {
    authorization: 'edffa591-7342-443f-9879-ec7848c77e24',
    'Content-Type': 'application/json'
  }
}
