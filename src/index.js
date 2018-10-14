import { drawShapes } from './draw'
import { generateMatrix, shapeCreator } from './terrain'
import { mouseMove } from './events'
import { config } from './config'

// TODO starting point selection
// TODO fog of war
// TODO zombie starting points

const init = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const matrix = generateMatrix(config.totalSpaces)
  const { shapes } = shapeCreator(matrix, 0, 0)

  let indexOfCollidingShape = undefined
  let indexOfSelectedShape = undefined

  canvas.addEventListener('mousemove', mouseMove(canvas, shapes, indexOfCollidingShape, (err, foundCollision) => {
    indexOfCollidingShape = foundCollision
    const previouslySelectedShape = shapes[_.findIndex(shapes, 'hover')]
    if (previouslySelectedShape) {
      previouslySelectedShape.hover = false
    }
    shapes[indexOfCollidingShape].hover = true
  }), false)

  canvas.addEventListener('click', mouseMove(canvas, shapes, indexOfCollidingShape, (err, foundCollision) => {
    indexOfSelectedShape = foundCollision
    const indexOfPreviouslySelectedShape = _.findIndex(shapes, 'selected')

    if (shapes[indexOfPreviouslySelectedShape]) {
      shapes[indexOfPreviouslySelectedShape].selected = false
    }
    if (indexOfSelectedShape !== indexOfPreviouslySelectedShape){
      shapes[indexOfCollidingShape].selected = true
    }
    console.log(shapes[indexOfCollidingShape])
  }), false)

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    drawShapes(canvas, shapes)
    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}

window.onload = () => init()