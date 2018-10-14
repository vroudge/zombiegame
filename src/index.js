import _ from 'lodash'
import { drawBox, drawShapes } from './draw'
import { generateMatrix, shapeCreator } from './terrain'
import { getMousePos } from './events'

const init = () => {
  let mousePosition = { mx: 0, my: 0 }
  let collisionWithBox = undefined

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const mouseDebug = document.getElementById('mousedebug')
  const matrix = generateMatrix(10)
  const { shapes } = shapeCreator(matrix, 0, 0)

  const matchCollide = (shapeList, { mx = 0, my = 0 }) => {
    if (mx > 9) mx = 9
    if (my > 9) my = 9
    const foundCollision = _.find(shapeList, (elem) => {
      return (
        mx >= elem.x
        && mx <= elem.x + (elem.width / 2)
        && my >= elem.y
        && my <= elem.y + (elem.height / 2)
      )
    })
    return foundCollision ? foundCollision : undefined
  }

  canvas.addEventListener('mousemove', function (evt) {
    mousePosition = getMousePos(canvas, evt)
    collisionWithBox = { ...matchCollide(shapes, mousePosition), ...mousePosition }
    mouseDebug.textContent = 'Mouse position: ' + mousePosition.mx + ',' + mousePosition.my
  }, false)

  const draw = () => {
    ctx.clearRect(0, 0, 400, 400) // clear canvas

    drawShapes(canvas, shapes)
    if (collisionWithBox) {
      drawBox(canvas, collisionWithBox, '#FF0000')
    }

    window.requestAnimationFrame(draw)
  }
  window.requestAnimationFrame(draw)
}

window.onload = init()