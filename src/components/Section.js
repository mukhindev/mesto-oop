export default class Section {
  constructor ({ renderer, containerSelector }) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  _clear () {
    this._container.innerHTML = ''
  }

  addItem (element) {
    this._container.prepend(element)
  }

  renderItems (items, payload) {
    this._clear()
    items.reverse().forEach(item => {
      this._renderer(item, payload)
    })
  }
}
