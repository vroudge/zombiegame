import { config } from './config'
import _ from 'lodash'

const mouseDebug = document.getElementById('mousedebug')
let mousePosition = { mx: 0, my: 0 }

export const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  return {
    mx: Math.floor((evt.clientX - rect.left) / (canvas.width / config.totalSpaces)),
    my: Math.floor((evt.clientY - rect.top) / (canvas.width / config.totalSpaces))
  }
}

const matchCollide = (shapeList, { mx = 0, my = 0 }) => {
  if (mx > 9) mx = 9
  if (my > 9) my = 9
  const foundCollision = _.findIndex(shapeList, (elem) => {
    return (
      mx >= elem.x
      && mx <= elem.x + (elem.width / 2)
      && my >= elem.y
      && my <= elem.y + (elem.height / 2)
    )
  })
  return foundCollision ? foundCollision : undefined
}

export const mouseMove = (canvas, shapes, indexOfCollidingShape, callback) => (evt) => {
  mousePosition = getMousePos(canvas, evt)
  indexOfCollidingShape = matchCollide(shapes, mousePosition)
  mouseDebug.textContent = 'Mouse position: ' + mousePosition.mx + ',' + mousePosition.my
  callback(null, indexOfCollidingShape)
}
