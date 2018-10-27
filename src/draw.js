import { config } from './config'

export const drawBox = (canvas, shape) => {
  const ctx = canvas.getContext('2d')
  const canvasPartLength = canvas.width / config.totalSpaces
  const strokeArgs = [shape.x * config.totalSpaces / 5, shape.y * config.totalSpaces / 5, shape.width * canvasPartLength, shape.height * canvasPartLength]
  let color = 'rgba(0, 0, 0, 0.1)'
  ctx.imageSmoothingEnabled = false
  ctx.globalAlpha = 1


  if (!shape.discovered && !shape.hover) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(...strokeArgs)
  } else if (!shape.discovered && shape.hover) {
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.fillRect(...strokeArgs)
  } else if (shape.discovered && shape.hover) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'
    ctx.fillRect(...strokeArgs)
  }
  if (shape.selected) {
    color = 'rgba(255, 0, 0, 1)'
  } else if (shape.hover && !shape.selected) {
    color = 'rgba(255, 255, 255, 1)'
  }

  ctx.strokeStyle = color
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
