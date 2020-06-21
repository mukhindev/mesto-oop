export class Card {
  constructor (data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }
  _getTemplate () {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }
  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__photo').dataset.link = this._link
    this._element.querySelector('.place__photo').alt = `Фотография места ${this._name}`;
    this._element.querySelector('.place__photo').dataset.name = this._name
    this._element.querySelector('.place__name').textContent = this._name;
    return this._element;
  }
}
