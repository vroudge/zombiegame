import { drawMapBorder, drawShapes } from './draw'
import { createGrid } from './terrain'
import { keyPress, mouseMove } from './events'
import { config } from './config'

// TODO bugfix: 0,0 shape location produces an error
// TODO starting points selection
// TODO pathfinding between Zed starting point and player starting point
// TODO fog of war / scouting --> V
// TODO Zoom + pan --> V
// TODO generate ressources on scouting depending on shape size
// TODO menu for each shape of the grid (select a shape)
// TODO task system (ie: scout, move guy...)
// TODO save and load

const init = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const { shapes } = createGrid(config.totalSpaces)
  let indexOfCollidingShape = undefined
  let indexOfSelectedShape = undefined
  let viewportPosition = [0, 0]

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
      console.log(shapes[indexOfCollidingShape])
    }
  ), false)

  window.addEventListener('keydown', keyPress(ctx,
    (err, translation) => {
      if (viewportPosition[0] > -30 && translation[0] < 0) {
        viewportPosition[0] += translation[0]
        ctx.translate(translation[0], 0)
      }
      if (viewportPosition[0] < 30 && translation[0] > 0) {
        viewportPosition[0] += translation[0]
        ctx.translate(translation[0], 0)
      }
      if (viewportPosition[1] > -30 && translation[1] < 0) {
        viewportPosition[1] += translation[1]
        ctx.translate(0, translation[1])
      }
      console.log(translation, viewportPosition)
      if (viewportPosition[1] < 30 && translation[1] > 0) {
        viewportPosition[1] += translation[1]
        ctx.translate(0, translation[1])
      }
    },
  ), false)

  const draw = () => {
    drawMapBorder(canvas, { x: -30, y: -30, width: 30 * 2 + canvas.width, height: 30 * 2 + canvas.height })
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    drawShapes(canvas, shapes)
    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}

window.onload = () => init()