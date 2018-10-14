import { drawShapes } from './draw'
import { generateMatrix, shapeCreator } from './terrain'
import { mouseMove } from './events'

const init = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const matrix = generateMatrix(10)
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
  }), false)

  const draw = () => {
    ctx.clearRect(0, 0, 400, 400) // clear canvas
    drawShapes(canvas, shapes)
    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}

window.onload = () => init()