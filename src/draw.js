import { config } from './config'

export const drawBox = (canvas, shape) => {
  const ctx = canvas.getContext('2d')
  let hasBasicColor = true
  const canvasPartLength = canvas.width / config.totalSpaces
  let color = 'rgba(0, 0, 0, 0.3)'
  if (shape.selected) {
    hasBasicColor = false
    color = 'rgba(255, 0, 0, 1)'
  }
  if (shape.hover && !shape.selected) {
    hasBasicColor = false
    color = 'rgba(0, 0, 0, 0.5)'
  }
  ctx.strokeStyle = color
  if (!hasBasicColor) { // double dat stroke for selected/hover
    ctx.strokeRect(shape.x * config.totalSpaces * 4, shape.y * config.totalSpaces * 4, shape.width * canvasPartLength, shape.height * canvasPartLength)
  }
  ctx.strokeRect(shape.x * config.totalSpaces * 4, shape.y * config.totalSpaces * 4, shape.width * canvasPartLength, shape.height * canvasPartLength)
  return shape
}

export const drawShapes = (canvas, shapes) => {
  for (let shape of shapes) {
    drawBox(canvas, shape)
  }
  return shapes
}
