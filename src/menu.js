import { getButtonHandlers } from './events'

const menuContainer = document.getElementById('context-menu')
let menuDomRefs = {}

const findOrCreateButton = (parent, id, buttonText, getButtonHandlers) => {
  if (menuDomRefs[id]) return menuDomRefs[id]
  menuDomRefs[id] = document.createElement('button')
  menuDomRefs[id].onclick = getButtonHandlers(id)
  menuDomRefs[id].id = id
  menuDomRefs[id].appendChild(document.createTextNode(buttonText))
  menuContainer.appendChild(menuDomRefs[id])
  return menuDomRefs[id]
}

const displayOrHideButton = (domElement, shouldShow) => {
  if (shouldShow) {
    domElement.classList.remove('hide')
  } else {
    domElement.classList.add('hide')
  }
}

export const displayInMenu = (shape) => {
  displayOrHideButton(findOrCreateButton(menuContainer, 'discover', 'Scout', getButtonHandlers), shape.discoverable)
}