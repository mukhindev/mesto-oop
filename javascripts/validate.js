const enableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = false
  buttonElement.classList.remove(options.inactiveButtonClass)
}

const disableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = true
  buttonElement.classList.add(options.inactiveButtonClass)
}

const checkValidityForm = (form, options) => {
  const buttonElement = form.querySelector(options.submitButtonSelector)
  if (form.checkValidity()) enableSubmitButton(buttonElement, options)
  else disableSubmitButton(buttonElement, options)
}

const getErrorSpan = (input) => {
  return document.querySelector(`#${input.id}-error`)
}

const showInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = input.validationMessage
  error.classList.add(options.errorClass)
  input.classList.add(options.inputErrorClass)
}

const hideInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = ''
  error.classList.remove(options.errorClass)
  input.classList.remove(options.inputErrorClass)
}

const handleInput = (e, options) => {
  const input = e.target
  if (input.checkValidity()) hideInputError(input, options)
  else showInputError(input, options)
}

const enableValidation = (options) => {
  const formElements = Array.from(document.querySelectorAll(options.formSelector))
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector))
    inputElements.forEach((input) => {
      input.addEventListener('input', (e) => {
        handleInput(e, options)
        checkValidityForm(formElement, options)
      })
    })
    formElement.closest(`.${options.popupClass}`).addEventListener('transitionend', function (evt) {
      if (evt.target.classList.contains(options.popupClass) && evt.propertyName === 'visibility') {
        inputElements.forEach(input => {
          hideInputError(input, options)
          checkValidityForm(formElement, options)
        })
      }
    })
    // Первичная проверка
    checkValidityForm(formElement, options)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupClass: 'popup',
})
