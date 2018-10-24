import { config } from './config'
import { createGrid } from './terrain'

export const persistGameState = (shapes) => {
  localStorage.setItem('shapes', JSON.stringify(shapes))
  return shapes
}

export const loadGameState = () => {
  const { totalSpaces } = config
  const savedState = localStorage.getItem('shapes')

  if (!savedState) {
    console.log('Newgame')
    const { shapes } = createGrid(totalSpaces)
    return {
      isNewGame: true,
      shapes: persistGameState(shapes),
    }
  } else {
    console.log('Loadgame')
    return {
      shapes: JSON.parse(savedState),
      isNewGame: false,
    }
  }
}