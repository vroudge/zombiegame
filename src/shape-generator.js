import { possibleShapes } from './possible-shapes'

//shape initial state
export const shapeGenerator = () => ({
  ...possibleShapes[Math.floor(Math.random() * 5)],
  selected: false,
  hover: false,
  discovered: false
})