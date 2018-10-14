import _ from 'lodash'
import { config } from './config'
import { drawBox } from './draw'
import { possibleShapes } from './possible-shapes'

const shapes = []
const matrix = []

const findFittingShape = (width, height) => {
  const newShape = selectShape()
  if (height === 0 || width === 0) {
    return 0
  }
  return newShape.width <= width && newShape.height <= height ? newShape : findFittingShape(width, height)
}

const lookAheadFree = (row, positionInRow) => {
  let possibleWidth = 0
  if (row) {
    if (row[positionInRow] === 0) possibleWidth++
    if (row[positionInRow + 1] === 0 && possibleWidth) possibleWidth++
  }
  return possibleWidth
}

const fillMatrix = (matrix, x, y, { width, height }) => {
  matrix[y].fill(1, x, x + width)
  for (let i of _.times(height)) {
    matrix[y + i].fill(1, x, x + width)
  }
  return matrix
}

const shapeCreator = (matrix, x, y) => {
  const possibleWidth = lookAheadFree(matrix[y], x)
  const possibleHeight = y < config.totalSpaces && matrix[y + 1] && matrix[y + 1][x] !== 1 ? 2 : 1
  if (possibleWidth === 0) {
    if (x < config.totalSpaces) {
      return shapeCreator(matrix, x + 1, y)
    } else if (y < config.totalSpaces) {
      return shapeCreator(matrix, 0, y + 1)
    }
  }
  const newShape = findFittingShape(possibleWidth, possibleHeight)
  const nextPositionX = newShape.width + x
  matrix = fillMatrix(matrix, x, y, newShape)
  shapes.push({ ...newShape, x, y })
  if (nextPositionX < config.totalSpaces) {
    return shapeCreator(matrix, nextPositionX, y)
  } else if (y < 9) {
    return shapeCreator(matrix, 0, y + 1)
  } else {
    return { matrix, shapes }
  }
}
const generateMatrix = squareLength => _.times(squareLength, () => 0).map(elem => _.times(squareLength, () => 0))

const selectShape = () => possibleShapes[Math.floor(Math.random() * 5)]

export { shapeCreator, generateMatrix }