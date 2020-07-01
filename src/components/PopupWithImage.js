import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupElement.querySelector('.popup__lightbox-photo')
    this._popupLabel = this._popupElement.querySelector('.popup__lightbox-label')
  }

  open ({ link, name }) {
    this._popupImage.src = link
    this._popupImage.alt = `Фотография ${name}`
    this._popupLabel.textContent = name
    super.open()
  }
}
