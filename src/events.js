import { config } from './config'
import _ from 'lodash'

const mouseDebug = document.getElementById('mousedebug')
let mousePosition = { mx: 0, my: 0 }

export const getMousePos = (canvas, viewportPosition, evt) => {
  const rect = canvas.getBoundingClientRect()
  let mx = Math.floor((evt.clientX - rect.left - viewportPosition[0]) / (canvas.width / config.totalSpaces))
  let my = Math.floor((evt.clientY - rect.top - viewportPosition[1]) / (canvas.width / config.totalSpaces))
  if (mx >= config.totalSpaces) mx = config.totalSpaces - 1
  if (my >= config.totalSpaces) my = config.totalSpaces - 1
  if (mx <= 0) mx = 0
  if (my <= 0) my = 0
  return { mx, my }
}

const matchCollide = (shapeList, { mx = 0, my = 0 }) => {
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

export const mouseMove = (canvas, viewportPosition, shapes, indexOfCollidingShape, callback) => (evt) => {
  mousePosition = getMousePos(canvas, viewportPosition, evt)
  indexOfCollidingShape = matchCollide(shapes, mousePosition)
  mouseDebug.textContent = 'Mouse position: ' + mousePosition.mx + ',' + mousePosition.my
  callback(null, indexOfCollidingShape)
}

export const keyPress = (ctx, viewportPosition) => ({ keyCode }) => {
  let translateTo = [0, 0]
  switch (keyCode) {
    case 38: // up
    case 87: // w
      translateTo[1] = 2
      break
    case 40: // down
    case 83: // s
      translateTo[1] = -2
      break
    case 37: // left
    case 65: // a
      translateTo[0] = 2
      break
    case 39: // right
    case 68: // d
      translateTo[0] = -2
      break
    default:
      break
  }

  if (viewportPosition[0] > -30 && translateTo[0] < 0) {
    viewportPosition[0] += translateTo[0]
    ctx.translate(...translateTo)
  }
  if (viewportPosition[0] < 30 && translateTo[0] > 0) {
    viewportPosition[0] += translateTo[0]
    ctx.translate(...translateTo)
  }
  if (viewportPosition[1] > -30 && translateTo[1] < 0) {
    viewportPosition[1] += translateTo[1]
    ctx.translate(...translateTo)
  }
  if (viewportPosition[1] < 30 && translateTo[1] > 0) {
    viewportPosition[1] += translateTo[1]
    ctx.translate(...translateTo)
  }
}
