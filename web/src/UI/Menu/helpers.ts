const getOffsetY = (rect: ClientRect) => {
  const top =  window.scrollY + rect.top + rect.height

  return { top: `${top}px` }
}

const getOffsetX = (rect: ClientRect, position?: 'left') => {
  if (position === 'left') {
    return { left: `${rect.left}px` }
  }

  return { right: `${document.body.scrollWidth - rect.left - rect.width}px` }
}

export const getElementOffset = (
  wrap: HTMLDivElement,
  element: HTMLDivElement,
  position?: 'left'
) => {
  const rect = wrap.getBoundingClientRect()
  const offsetX = getOffsetX(rect, position)
  const offsetY = getOffsetY(rect)

  return { ...offsetX, ...offsetY }
}
