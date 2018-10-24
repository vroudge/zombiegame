import { config } from './config'
import _ from 'lodash'
import { displayInMenu } from './menu'

const mouseDebug = document.getElementById('mousedebug')
let mousePosition = { mx: 0, my: 0 }
let viewportPosition = { x: 0, y: 0 }
let indexOfCollidingShape = undefined
let indexOfSelectedShape = undefined

export const bindEvents = (canvas, shapes) => {
  const ctx = canvas.getContext('2d')

  canvas.addEventListener('mousemove', mouseMove(canvas, shapes, indexOfCollidingShape,
    (err, foundCollision) => {
      indexOfCollidingShape = foundCollision
      const previouslySelectedShape = shapes[_.findIndex(shapes, 'hover')]
      if (previouslySelectedShape) {
        previouslySelectedShape.hover = false
      }
      shapes[indexOfCollidingShape].hover = true
    }
  ), false)

  canvas.addEventListener('click', mouseMove(canvas, shapes, indexOfCollidingShape,
    (err, foundCollision) => {
      indexOfSelectedShape = foundCollision
      const indexOfPreviouslySelectedShape = _.findIndex(shapes, 'selected')

      if (shapes[indexOfPreviouslySelectedShape]) {
        shapes[indexOfPreviouslySelectedShape].selected = false
      }
      if (indexOfSelectedShape !== indexOfPreviouslySelectedShape) {
        shapes[indexOfCollidingShape].selected = true
      }
      displayInMenu(shapes[indexOfCollidingShape])
      // shapes[indexOfCollidingShape].discovered = true
    }
  ), false)

  window.addEventListener('keydown', keyPress(ctx), false)
}

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  let mx = Math.floor((evt.clientX - rect.left - viewportPosition.x) / (canvas.width / config.totalSpaces))
  let my = Math.floor((evt.clientY - rect.top - viewportPosition.y) / (canvas.width / config.totalSpaces))
  if (mx >= config.totalSpaces) mx = config.totalSpaces - 1
  if (my >= config.totalSpaces) my = config.totalSpaces - 1
  if (mx <= 0) mx = 0
  if (my <= 0) my = 0
  return { mx, my }
}

export const matchCollide = (shapeList, { mx = 0, my = 0 }) =>
  _.findIndex(shapeList, (elem) => (
    mx >= elem.x
    && mx <= elem.x + (elem.width / 2)
    && my >= elem.y
    && my <= elem.y + (elem.height / 2)
  ))

const mouseMove = (canvas, shapes, indexOfCollidingShape, callback) => (evt) => {
  mousePosition = getMousePos(canvas, evt)
  indexOfCollidingShape = matchCollide(shapes, mousePosition)
  mouseDebug.textContent = 'Mouse position: ' + mousePosition.mx + ',' + mousePosition.my
  callback(null, indexOfCollidingShape)
}

const keyPress = (ctx) => ({ keyCode }) => {
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

  if (viewportPosition.x > -30 && translateTo[0] < 0) {
    viewportPosition.x += translateTo[0]
    ctx.translate(...translateTo)
  }
  if (viewportPosition.x < 30 && translateTo[0] > 0) {
    viewportPosition.x += translateTo[0]
    ctx.translate(...translateTo)
  }
  if (viewportPosition.y > -30 && translateTo[1] < 0) {
    viewportPosition.y += translateTo[1]
    ctx.translate(...translateTo)
  }
  if (viewportPosition.y < 30 && translateTo[1] > 0) {
    viewportPosition.y += translateTo[1]
    ctx.translate(...translateTo)
  }
}
