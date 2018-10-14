import { config } from './config'

const drawBox = (canvas, { x, y }, shape) => {
  const ctx = canvas.getContext('2d')
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const canvasPartLength = canvas.width / config.totalSpaces
  ctx.strokeRect(x, y, shape.width * canvasPartLength, shape.height * canvasPartLength)
  return shape
}

export const drawShapes = (canvas, shapes)=>{
  for (let shape of shapes){
    drawBox(canvas, { x: shape.x * config.totalSpaces * 4, y: shape.y * config.totalSpaces * 4 }, shape)
  }
  return shapes
}
