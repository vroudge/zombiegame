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
  if (mx > config.totalSpaces - 1) mx = config.totalSpaces - 1
  if (my > config.totalSpaces - 1) my = config.totalSpaces - 1
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

export const keyPress = (ctx, callback) => ({ keyCode }) => {
  let translateTo = [0, 0]
  switch (keyCode) {
    case 38: // up
      translateTo[1] = 2
      break
    case 40: // down
      translateTo[1] = -2
      break
    case 37: // left
      translateTo[0] = 2
      break
    case 39: // right
      translateTo[0] = -2
      break
    default:
      break
  }
  callback(null, translateTo)
}
