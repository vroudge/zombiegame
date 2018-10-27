import { drawMapBorder, drawShapes } from './draw'
import { createGrid, selectStartingPoint } from './terrain'
import { config } from './config'
import { bindEvents, setDiscoverableShapesAroundShape, matchCollide } from './events'
import { loadGameState, persist, persistGameState } from './save'

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
  const { shapes, isNewGame } = loadGameState()
  let fps = 30
  let eachNthFrame = Math.round((1000 / fps) / 16.66)
  let frameCount = eachNthFrame

  if (isNewGame) {
    setDiscoverableShapesAroundShape(shapes, selectStartingPoint(shapes))
  }
  persistGameState(shapes)

  const draw = () => {
    window.requestAnimationFrame(draw)
    if (frameCount === eachNthFrame) {
      frameCount = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
      drawShapes(canvas, shapes)
      // TODO redo drawMapBorder(canvas, { x: -30, y: -30, width: 30 * 2 + canvas.width, height: 30 * 2 + canvas.height })
    }
    frameCount++
  }

  bindEvents(canvas, shapes)
  window.requestAnimationFrame(draw)
}

window.onload = () => init()