import { config } from './config'

export const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  return {
    x: Math.floor((evt.clientX - rect.left) / (canvas.width / config.totalSpaces)),
    y: Math.floor((evt.clientY - rect.top) / (canvas.width / config.totalSpaces))
  }
}