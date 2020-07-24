import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor ({ popupSelector, handleButtonOk }) {
    super(popupSelector)
    this._handleButtonOk = handleButtonOk
    this._buttonOk = this._popupElement.querySelector('.popup__save-button')
  }

  setEventListeners () {
    super.setEventListeners()
    this._buttonOk.addEventListener('click', (evt) => {
      this._handleButtonOk(this._elementForDelete)
      this.close()
    })
  }

  open (element) {
    super.open()
    // Елемент для удаления
    this._elementForDelete = element
  }
}
