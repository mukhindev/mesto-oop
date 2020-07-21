export default class Card {
  constructor ({ data, userData, cardSelector, handleCardClick, handleCardDelete, handleCardLike }) {
    this._data = data
    this._userData = userData
    this._name = data.name
    this._link = data.link
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike
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
    this._handleCardLike({
      cardId: this._data._id
    })
  }

  isLiked () {
    if (this._data.likes.some((like) => like._id === this._userData._id)) return true
    else return false
  }

  like () {
    this._buttonLike.classList.add('place__like_active')
  }

  dislike () {
    this._buttonLike.classList.remove('place__like_active')
  }

  updateLikesState(data) {
    this._data = data
    this._setConterLikes()
    if (this.isLiked()) {
      this.like()
    } else {
      this.dislike()
    }
  }

  _setConterLikes () {
    this._counterLike.textContent = this._data.likes?.length || 0
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
  }

  // Установка кнопки удаления
  _setDeleteButton () {
    this._buttonDelete = document.createElement('button')
    this._buttonDelete.type = "button"
    this._buttonDelete.title = 'Удалить'
    this._buttonDelete.classList.add('place__delete-button')
    // Слушатель клика кнопки удаления карточки
    this._buttonDelete.addEventListener('click', () => {
      this._handleClickDeleteButton()
    })
    this._placeСard.append(this._buttonDelete)
  }

  generateCard () {
    // Получение элементов
    this._placeСard = this._getTemplate()
    this._placePhoto = this._placeСard.querySelector('.place__photo')
    this._placeName = this._placeСard.querySelector('.place__name')
    this._buttonLike = this._placeСard.querySelector('.place__like')
    this._counterLike = this._placeСard.querySelector('.place__like-counter')
    // Если владелец карточки, поставить кнопку удаления
    if (this._userData._id === this._data.owner._id) this._setDeleteButton()
    // Назначение атрибутов для элементом
    this._placePhoto.src = this._link
    this._placePhoto.alt = `Фотография места ${this._name}`
    // Вывод названия места
    this._placeName.textContent = this._name
    // Вывод кол-ва лайков на карточке
    this.updateLikesState(this._data)
    // Установка слушателей
    this._setEventListeners()
    return this._placeСard
  }
}
