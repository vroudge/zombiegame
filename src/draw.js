import { config } from './config'

export const drawBox = (canvas, shape, color) => {
  const ctx = canvas.getContext('2d')
  const canvasPartLength = canvas.width / config.totalSpaces
  if (color) {
    ctx.strokeStyle = color
  } else {
    ctx.strokeStyle = '#000000'
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
