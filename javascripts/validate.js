// Функция: Разрешить кнопку submit
const enableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = false
  buttonElement.classList.remove(options.inactiveButtonClass)
}

// Функция: Рапретить кнопку submit
const disableSubmitButton = (buttonElement, options) => {
  buttonElement.disabled = true
  buttonElement.classList.add(options.inactiveButtonClass)
}

// Функция: Проверка состояния валидации формы
const checkValidityForm = (form, options) => {
  const buttonElement = form.querySelector(options.submitButtonSelector)
  if (form.checkValidity()) enableSubmitButton(buttonElement, options)
  else disableSubmitButton(buttonElement, options)
}

// Функция: Получение span для вывода ошибки
const getErrorSpan = (input) => {
  return document.querySelector(`#${input.id}-error`)
}

// Функция: Отобратить ошибки валидации поля
const showInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = input.validationMessage
  error.classList.add(options.errorClass)
  input.classList.add(options.inputErrorClass)
}

// Функция: Скрыть ошибки валидации поля
const hideInputError = (input, options) => {
  const error = getErrorSpan(input)
  error.textContent = ''
  error.classList.remove(options.errorClass)
  input.classList.remove(options.inputErrorClass)
}

// Функция: Обрабатывать ввод в поле
const handleInput = (e, options) => {
  const input = e.target
  if (input.checkValidity()) hideInputError(input, options)
  else showInputError(input, options)
}

// Функция: Подключение валидации
const enableValidation = (options) => {
  // Поиск соответствующих форм
  const formElements = Array.from(document.querySelectorAll(options.formSelector))
  // Поиск полей в формах
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector))
    inputElements.forEach((input) => {
      // На каждое поле вешается слушатель
      input.addEventListener('input', (e) => {
        // Вызывается обработчик поля
        handleInput(e, options)
        // Проверка состояния валидации соответствующей формы
        checkValidityForm(formElement, options)
      })
    })
    // На формы вешается слушатель, ожидающий событие "showForm"
    formElement.addEventListener('showForm', (e) => {
      inputElements.forEach(input => {
        // Сбрасываются ошибки полей
        hideInputError(input, options)
        // Проверка состояния валидации соответствующей формы
        checkValidityForm(formElement, options)
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
