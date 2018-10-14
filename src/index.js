import _ from 'lodash'
import { drawShapes } from './draw'
import { shapeCreator } from './terrain'
import { getMousePos } from './events'

const init = () => {
  const generateMatrix = squareLength => _.times(squareLength, () => 0).map(elem => _.times(squareLength, () => 0))
  const canvas = document.getElementById('canvas')
  const mouseDebug = document.getElementById('mousedebug')
  const matrix = generateMatrix(10)
  const { shapes } = shapeCreator(matrix, 0, 0)
  const drawnShapes = drawShapes(canvas, shapes)
  console.log(drawnShapes)
  canvas.addEventListener('mousemove', function (evt) {
    const mousePos = getMousePos(canvas, evt)
    mouseDebug.textContent = 'Mouse position: ' + mousePos.x + ',' + mousePos.y
  }, false)
}

window.onload = init()