export default class Api {
  constructor ({ hostname, cohort, headers = {} }) {
    this.url = `${hostname}/cohort-${cohort}`
    this.headers = headers
  }

  _handleResponse (response) {
    if (response.ok) {
      console.log(response)
      return response.json()
    } else {
      console.error(response.status)
      return Promise.reject(response.statusText)
    }
  }

  _handleError (error) {
    console.error(error)
    return Promise.reject(error.message)
  }

  getMe () {
    return fetch(`${this.url}/users/me`, { headers: this.headers })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  getCards () {
    return fetch(`${this.url}/cards`, { headers: this.headers })
      .then(this._handleResponse)
      .catch(this._handleError)
  }
}
