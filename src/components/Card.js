import { openPhoto } from '../pages/index.js'

export class Card {
  constructor (data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  // Получение шаблона карточки
  _getTemplate () {
    const template = document.querySelector(this._cardSelector).content
    const cardElement = template.querySelector('.place').cloneNode(true)
    return cardElement
  }

  // Обработчик клика по фото
  _handleClickPhoto () {
    openPhoto({
      name: this._name,
      link: this._link
    })
  }

  // Обработчик клика кнопки лайка
  _handleClickButtonLike () {
    this._buttonLike.classList.toggle('place__like_active')
  }

  // Обработчик клика кнопки удаления карточки
  _handleClickDeleteButton () {
    this._placeСard.remove()
  }

  // Установка слушателей
  _setEventListeners () {
    this._placePhoto.addEventListener('click', () => {
      this._handleClickPhoto()
    })
    // Слушатель клика кнопки лайка
    this._buttonLike.addEventListener('click', () => {
      this._handleClickButtonLike()
    })
    // Слушатель клика кнопки удаления карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleClickDeleteButton()
    })
  }

  generateCard () {
    // Получение элементов
    this._placeСard = this._getTemplate()
    this._placePhoto = this._placeСard.querySelector('.place__photo')
    this._placeName = this._placeСard.querySelector('.place__name')
    this._buttonLike = this._placeСard.querySelector('.place__like')
    this._buttonDelete = this._placeСard.querySelector('.place__delete-button')
    // Назначение атрибутов для элементом
    this._placePhoto.src = this._link
    this._placePhoto.alt = `Фотография места ${this._name}`
    this._placeName.textContent = this._name
    // Установка слушателей
    this._setEventListeners()
    return this._placeСard
  }
}
