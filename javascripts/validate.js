const showInputError = (input, options) => {
  const error = document.querySelector(`#${input.id}-error`)
  error.textContent = input.validationMessage
  input.classList.add(options.inputErrorClass)
}

const hideInputError = (input, options) => {
  const error = document.querySelector(`#${input.id}-error`)
  error.textContent = ''
  input.classList.remove(options.inputErrorClass)
}

const handleInput = (e, options) => {
  const input = e.target
  if (input.checkValidity()) hideInputError(input, options)
  else showInputError(input, options)
}

const handleButton = (e, formElement, options) => {
  const buttonElement = formElement.querySelector(options.submitButtonSelector)
  formElement.addEventListener('input', () => {
    const isValid = formElement.checkValidity()
    buttonElement.disabled = !isValid
    if (isValid) buttonElement.classList.remove(options.inactiveButtonClass)
    else buttonElement.classList.add(options.inactiveButtonClass)
  })
}

const enableValidation = (options) => {
  const formElements = Array.from(document.querySelectorAll(options.formSelector))
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector))
    inputElements.forEach((input) => {
      input.addEventListener('input', (e) => {
        handleInput(e, options)
        handleButton(e, formElement, options)
      })
    })
    formElement.closest(`.${options.popupClass}`).addEventListener('transitionend', function (evt) {
      if (evt.target.classList.contains(options.popupClass) && evt.propertyName === 'visibility') {
        inputElements.forEach(input => {
          hideInputError(input, options)
        })
      }
    })
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
