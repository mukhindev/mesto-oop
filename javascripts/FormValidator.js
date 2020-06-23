export class FormValidator {
  constructor (options, formElement) {
    this._options = options
    this._formElement = formElement
  }

  // Разрешить кнопку submit
  _enableSubmitButton (buttonElement, options) {
    buttonElement.disabled = false
    buttonElement.classList.remove(options.inactiveButtonClass)
  }

  // Запретить кнопку submit
  _disableSubmitButton (buttonElement, options) {
    buttonElement.disabled = true
    buttonElement.classList.add(options.inactiveButtonClass)
  }

  // Проверка состояния валидации формы
  _checkValidityForm (form, options) {
    const buttonElement = form.querySelector(options.submitButtonSelector)
    if (form.checkValidity()) this._enableSubmitButton(buttonElement, options)
    else this._disableSubmitButton(buttonElement, options)
  }

  // Получение span для вывода ошибки
  _getErrorSpan (input) {
    return document.querySelector(`#${input.id}-error`)
  }

  // Отобратить ошибки валидации поля
  _showInputError (input, options) {
    const error = this._getErrorSpan(input)
    error.textContent = input.validationMessage
    error.classList.add(options.errorClass)
    input.classList.add(options.inputErrorClass)
  }

  // Скрыть ошибки валидации поля
  _hideInputError (input, options) {
    const error = this._getErrorSpan(input)
    error.textContent = ''
    error.classList.remove(options.errorClass)
    input.classList.remove(options.inputErrorClass)
  }

  // Обрабатывать ввод в поле
  _handleInput (input, options) {
    if (input.checkValidity()) this._hideInputError(input, options)
    else this._showInputError(input, options)
  }

  // Метод активации валидации
  enableValidation () {
    const inputElements = Array.from(this._formElement.querySelectorAll(this._options.inputSelector))
    inputElements.forEach((input) => {
      // На каждое поле вешается слушатель
      input.addEventListener('input', () => {
        // Вызывается обработчик поля
        this._handleInput(input, this._options)
        // Проверка состояния валидации соответствующей формы
        this._checkValidityForm(this._formElement, this._options)
      })
    })
    // На формы вешается слушатель, ожидающий событие "showForm"
    this._formElement.addEventListener('showForm', (e) => {
      inputElements.forEach(input => {
        // Сбрасываются ошибки полей
        this._hideInputError(input, this._options)
        // Проверка состояния валидации соответствующей формы
        this._checkValidityForm(this._formElement, this._options)
      })
    })
  }
}
