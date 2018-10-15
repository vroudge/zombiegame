import { drawMapBorder, drawShapes } from './draw'
import { createGrid } from './terrain'
import { keyPress, mouseMove } from './events'
import { config } from './config'
import { displayInMenu } from './menu'

// TODO contextual menu
// TODO starting points selection
// TODO pathfinding between Zed starting point and player starting point
// TODO fog of war / scouting --> V
// TODO Zoom + pan --> V
// TODO generate ressources on scouting depending on shape size
// TODO task system (ie: scout, move guy...)
// TODO save and load
// TODO implement multitouch with hammer

const init = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const { shapes } = createGrid(config.totalSpaces)
  let indexOfCollidingShape = undefined
  let indexOfSelectedShape = undefined

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

  const draw = () => {
    drawMapBorder(canvas, { x: -30, y: -30, width: 30 * 2 + canvas.width, height: 30 * 2 + canvas.height })
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    drawShapes(canvas, shapes)
    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}

window.onload = () => init()