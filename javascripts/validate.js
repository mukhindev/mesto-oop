// Функция: поиск элементов в других элементах
function findElementsInElements({ parents, target }) {
  const elements = []
  parents.forEach(place => {
    place.querySelectorAll(target).forEach(element => { 
      elements.push({ element, parent: place }) 
    })
  })
  return elements
}

// Функция: узнать состояние валидации input
function getStateValidity(input) {
  return {
    valid: input.checkValidity(),
    message: input.validationMessage
  }
}

// Функция: узнать состояние валидации input
function getStateValidityForm({form, inputs}) {
  const checkedInputs = inputs.filter(input => input.parent === form)
  return checkedInputs.every(input => input.element.checkValidity())
}

// Функция: получить сообщение о валидации из input
function getErrorMessage(input) {
  const { message } = getStateValidity(input)
  return message
}

// Функция: вывод сообщения об ошибке
function setErrorMessage({ input, message }) {
  const error = document.querySelector(`#${input.id}-error`)
  error.textContent = message
}

// Состояние кнопки
function setStateButton({ button, valid}) {
  if (valid) {
    button.disabled = false
    button.classList.remove('popup__save-button_disabled')
  } else {
    button.disabled = true 
    button.classList.add('popup__save-button_disabled')
  }
}

// Поиск кнопки submin
function findButtonByInput(element, inputs) {
  const form = inputs.find(el => el.element === element).parent
  return form.querySelector('[type="submit"]')
}

// Функция: обрабатываем изменения в input
function handleInput(evt, inputs) {
  const input = evt.target
  const { valid, message } = getStateValidity(input)
  setErrorMessage ({ input, message })
  setStateButton ({ button: findButtonByInput(input, inputs), valid })
}

function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector))
  const inputs = findElementsInElements({ 
    parents: forms,
    target: options.inputSelector
  })
  const buttons = findElementsInElements({ 
    parents: forms,
    target: options.submitButtonSelector 
  })

  // Слушатели для попапов, реагирующие на css transition visibility
  forms.forEach(form => {
    form.closest(`.${options.popupClass}`).addEventListener('transitionend', function (evt) {
      if (evt.target.classList.contains(options.popupClass) && evt.propertyName === 'visibility') {
        // Сброс сообщений об ошибках
        inputs.forEach(input => {
          setErrorMessage ({ input: input.element, message: ''} )
        })
      }
    })
  })

  inputs.forEach(input => {
    input.element.addEventListener('input', (evt) => handleInput(evt, inputs))
  })

  buttons.forEach(button => {
    const form = button.element.closest(options.formSelector)
    const valid = getStateValidityForm({ form, inputs })
    if (valid) {
      button.disabled = false
      button.element.classList.remove(options.inactiveButtonClass)
    } else {
      button.disabled = true 
      button.element.classList.add(options.inactiveButtonClass)
    }
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
