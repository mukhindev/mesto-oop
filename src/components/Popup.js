export default class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this._buttonCloseElement = this._popupElement.querySelector('.popup__close-button')
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose (e) {
    if (e.key === 'Escape') this.close()
  }

  _handleOverlayClose (e) {
    if (e.target.classList.contains('popup_opened')) this.close()
  }

  setEventListeners () {
    this._buttonCloseElement.addEventListener('click', () => this.close())
    this._popupElement.addEventListener('mousedown', (e) => this._handleOverlayClose(e))
  }

  open () {
    this._popupElement.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close () {
    this._popupElement.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
