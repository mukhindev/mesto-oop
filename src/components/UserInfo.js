export default class UserInfo {
  constructor ({ id, nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._aboutElement = document.querySelector(aboutSelector)
    this._avatarElement = document.querySelector(avatarSelector)
    this._user = {
      _id: this.id,
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src
    }
  }

  getUserInfo () {
    return this._user
  }

  setUserInfo ({ name, about, avatar }) {
    this._user = { _id: this.id, name, about, avatar }
    this._nameElement.textContent = name
    this._aboutElement.textContent = about
    this._avatarElement.src = avatar
  }
}
