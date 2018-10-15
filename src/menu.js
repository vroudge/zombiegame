const menuX = document.getElementById('context-menu-x')
const menuY = document.getElementById('context-menu-y')
const menuD = document.getElementById('context-menu-discovered')

export const displayInMenu = ({x, y, discovered}) => {
  menuX.textContent = `x: ${x}`
  menuY.textContent = `y: ${y}`
  menuD.textContent = `is scouted: ${discovered}`
}