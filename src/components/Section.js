export default class Section {
  constructor ({ renderer, containerSelector }) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  _clear () {
    this._container.innerHTML = ''
  }

  addItem (element) {
    this._container.append(element)
  }

  renderItems (items, payload) {
    this._clear()
    items.forEach(item => {
      this._renderer(item, payload)
    })
  }
}
