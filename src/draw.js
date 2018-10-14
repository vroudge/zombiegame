import { config } from './config'

export const drawBox = (canvas, shape) => {
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
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
  const strokeArgs = [shape.x * config.totalSpaces / 5, shape.y * config.totalSpaces / 5, shape.width * canvasPartLength, shape.height * canvasPartLength]
  if (!hasBasicColor) { // double dat stroke for selected/hover
    ctx.strokeRect(...strokeArgs)
  }
  ctx.strokeRect(...strokeArgs)
  return shape
}

export const drawMapBorder = (canvas, shape) => {
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
}

export const drawShapes = (canvas, shapes) => {
  for (let shape of shapes) {
    drawBox(canvas, shape)
  }
  return shapes
}
