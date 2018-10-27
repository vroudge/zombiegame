import { config } from './config'
import _ from 'lodash'
import { displayInMenu } from './menu'

const mouseDebug = document.getElementById('mousedebug')
const dezoom = document.getElementById('dezoom')
const zoom = document.getElementById('zoom')

let mousePosition = { mx: 0, my: 0 }
let viewportPosition = { x: 0, y: 0, zoom: 1 }
let indexOfCollidingShape = undefined
let indexOfSelectedShape = undefined

export const bindEvents = (canvas, shapes) => {
  const ctx = canvas.getContext('2d')
  dezoom.onclick = e => {
    ctx.scale(0.5, 0.5)
    viewportPosition.zoom = viewportPosition.zoom / 2
    e.stopPropagation()
  }
  zoom.onclick = e => {
    ctx.scale(2, 2)
    viewportPosition.zoom = viewportPosition.zoom * 2
    e.stopPropagation()
  }
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

      // make clicked shape selected
      if (shapes[indexOfPreviouslySelectedShape]) {
        shapes[indexOfPreviouslySelectedShape].selected = false
      }
      if (indexOfSelectedShape !== indexOfPreviouslySelectedShape) {
        shapes[indexOfCollidingShape].selected = true
      }
      // display debug menu of shape
      displayInMenu(shapes[indexOfCollidingShape])
      setDiscoverableShapesAroundShape(shapes, indexOfSelectedShape)

    }
  ), false)

  window.addEventListener('keydown', keyPress(canvas), false)
}

export const getButtonHandlers = (key) => {
  return {
    'discover': (e) => {
      console.info('discover')
    }
  }[key]
}

export const setDiscoverableShapesAroundShape = (shapes, indexOfCurrentShape) => {
  const { y: cy, x: cx, width, height, discovered } = shapes[indexOfCurrentShape]
  if (!discovered) {
    return []
  }

  const currentShapeGridLocations = []
  // get all points of current shape
  for (let i = cx; i <= (cx + (width / 2)); i++) {
    for (let y = cy; y <= (cy + (height / 2)); y++) {
      currentShapeGridLocations.push({ x: i, y })
    }
  }
  // get points around each grid of shape
  let arr = []
  for (const point of currentShapeGridLocations) {
    arr.push({ x: point.x - 1, y: point.y })
    arr.push({ x: point.x + 1, y: point.y })
    arr.push({ x: point.x, y: point.y - 1 })
    arr.push({ x: point.x, y: point.y + 1 })
  }
  // filter points of shape
  return Array.from(
    new Set(
      arr
        .filter(e => {
          return !_.find(currentShapeGridLocations, e)
        })
        .map(point => matchCollide(shapes, { mx: point.x, my: point.y }))
    )
  )
    .map(e => shapes[e])
    .forEach(shape => shape.discoverable = true)
}

export const matchCollide = (shapeList, { mx = 0, my = 0 }) => {
  return _.findIndex(shapeList, (elem) => (
    mx >= elem.x
    && mx <= elem.x + (elem.width / 2)
    && my >= elem.y
    && my <= elem.y + (elem.height / 2)
  ))
}

const mouseMove = (canvas, shapes, indexOfCollidingShape, callback) => (evt) => {
  mousePosition = getMousePos(canvas, evt)
  indexOfCollidingShape = matchCollide(shapes, mousePosition)
  mouseDebug.textContent = 'Mouse position: ' + mousePosition.mx + ',' + mousePosition.my
  callback(null, indexOfCollidingShape)
}

const keyPress = canvas => ({ keyCode }) => {
  const ctx = canvas.getContext('2d')
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

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  let mx = Math.floor((evt.clientX - rect.left - (viewportPosition.x * viewportPosition.zoom)) / (canvas.width / config.totalSpaces) / viewportPosition.zoom)
  let my = Math.floor((evt.clientY - rect.top - (viewportPosition.y * viewportPosition.zoom)) / (canvas.height / config.totalSpaces) / viewportPosition.zoom)
  if (mx >= config.totalSpaces) mx = config.totalSpaces - 1
  if (my >= config.totalSpaces) my = config.totalSpaces - 1
  if (mx <= 0) mx = 0
  if (my <= 0) my = 0
  return { mx, my }
}
