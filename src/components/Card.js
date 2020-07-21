export default class Card {
  constructor ({ data, userData, cardSelector, handleCardClick, handleCardDelete }) {
    this._data = data
    this._userData = userData
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
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
    this._handleCardClick()
  }

  // Обработчик клика кнопки лайка
  _handleClickButtonLike () {
    this._buttonLike.classList.toggle('place__like_active')
  }

  // Обработчик клика кнопки удаления карточки
  _handleClickDeleteButton () {
    this._handleCardDelete({
      cardElement: this._placeСard, 
      cardId: this._data._id
    })
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
    this._counterLike = this._placeСard.querySelector('.place__like-counter')
    this._buttonDelete = this._placeСard.querySelector('.place__delete-button')
    if (this._userData._id !== this._data.owner._id) this._buttonDelete.remove()
    // Назначение атрибутов для элементом
    this._placePhoto.src = this._link
    this._placePhoto.alt = `Фотография места ${this._name}`
    // Вывод названия места
    this._placeName.textContent = this._name
    // Вывод кол-ва лайков на карточке
    this._counterLike.textContent = this._data.likes?.length || 0
    // Установка слушателей
    this._setEventListeners()
    return this._placeСard
  }
}
