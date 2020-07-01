export default class UserInfo {
  constructor ({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._aboutElement = document.querySelector(aboutSelector)
    this._user = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  getUserInfo () {
    return this._user
  }

  setUserInfo ({ name, about }) {
    this._user = { name, about }
    this._nameElement.textContent = name
    this._aboutElement.textContent = about
  }
}
