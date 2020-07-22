import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._inputList = this._popupElement.querySelectorAll('.popup__input')
    this._buttonSave = this._popupElement.querySelector('.popup__save-button')
    this._buttonText = this._buttonSave.textContent
  }

  _getInputValues () {
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  // Устанавливаются значения полей, если в методе open передал объект со свойством data
  _setInputValues (data) {
    this._inputList.forEach(input => {
      input.value = data[input.name]
    })
  }

  getForm () {
    return this._formElement
  }

  setEventListeners () {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  open ({ event, data }) {
    if (data) this._setInputValues(data)
    this._formElement.dispatchEvent(event)
    super.open()
  }

  close () {
    super.close()
    this._formElement.reset()
  }
  
  showProcess () {
    this._buttonSave.textContent = 'Сохранение...'
    this._buttonSave.disabled = true
  }

  hideProcess () {
    this._buttonSave.textContent = this._buttonText
    this._buttonSave.disabled = false
  }
}
