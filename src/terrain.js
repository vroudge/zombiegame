import _ from 'lodash'
import { config } from './config'
import { shapeGenerator } from './shape-generator'
import { matchCollide } from './events'

const findFittingShape = (width, height) => {
  const newShape = shapeGenerator()
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
  if (!width || !height) return matrix
  matrix[y].fill(1, x, x + width)
  for (let i of _.times(height)) {
    matrix[y + i].fill(1, x, x + width)
  }
  return matrix
}

const shapeInserter = (matrix, shapes, x, y) => {
  const possibleWidth = lookAheadFree(matrix[y], x)
  const possibleHeight = y < config.totalSpaces && matrix[y + 1] && matrix[y + 1][x] !== 1 ? 2 : 1
  if (possibleWidth === 0) {
    if (x < config.totalSpaces) {
      return shapeInserter(matrix, shapes, x + 1, y)
    } else if (y < config.totalSpaces) {
      return shapeInserter(matrix, shapes, 0, y + 1)
    }
  }
  const newShape = findFittingShape(possibleWidth, possibleHeight)
  const nextPositionX = newShape.width + x
  matrix = fillMatrix(matrix, x, y, newShape)
  shapes.push({ ...newShape, x, y })
  if (nextPositionX < config.totalSpaces) {
    return shapeInserter(matrix, shapes, nextPositionX, y)
  } else if (y < config.totalSpaces - 1) {
    return shapeInserter(matrix, shapes, 0, y + 1)
  } else {
    return { matrix, shapes }
  }
}

const generateMatrix = squareLength => _.times(squareLength, () => 0).map(() => _.times(squareLength, () => 0))

const createGrid = (matrixSize) => shapeInserter(generateMatrix(matrixSize), [], 0, 0)

const getRandomInGrid = (gridSize) => Math.floor(Math.random() * gridSize)

const selectStartingPoint = (shapes) => {
  let { mx, my } = { mx: getRandomInGrid(config.totalSpaces), my: getRandomInGrid(config.totalSpaces) }
  const shapeIndex = matchCollide(shapes, { mx, my })
  shapes[shapeIndex].discovered = true
}

export { createGrid, selectStartingPoint }