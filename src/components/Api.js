export default class Api {
  constructor ({ hostname, cohort, headers = {} }) {
    this.url = `${hostname}/cohort-${cohort}`
    this.headers = headers
  }

  _handleResponse (response) {
    if (response.ok) {
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

  updateMe ({ name, about }) {
    return fetch(`${this.url}/users/me`, { 
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about })
    })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  getCards () {
    return fetch(`${this.url}/cards`, { headers: this.headers })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  createCard ({ name, link }) {
    return fetch(`${this.url}/cards`, { 
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, link })
    })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  deleteCard (cardId) {
    return fetch(`${this.url}/cards/${cardId}`, { 
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError)
  }

}
