import { initialPlaces } from './data.js'
import { Card } from './Card.js'

// Сетка карточек мест
const places = document.querySelector('.places')

// Функция: Вывод имеющихся карточек
function initRender () {
  initialPlaces.forEach(place => {
    const card = new Card(place, '#place').generateCard()
    places.append(card)
  })
}

// Инициализация
initRender()
