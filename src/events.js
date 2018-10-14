import { config } from './config'

export const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect()
  return {
    mx: Math.floor((evt.clientX - rect.left) / (canvas.width / config.totalSpaces)),
    my: Math.floor((evt.clientY - rect.top) / (canvas.width / config.totalSpaces))
  }
}