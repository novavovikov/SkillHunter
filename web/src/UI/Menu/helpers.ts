interface ElementOffsetPositionOptions {
  offsetY: number
  position?: 'left' | undefined
}

export class ElementOffsetPosition {
  wrap: HTMLElement
  element: HTMLElement
  options: ElementOffsetPositionOptions = {
    offsetY: 0,
  }

  constructor (
    wrap: HTMLElement,
    element: HTMLElement,
    options?: ElementOffsetPositionOptions,
  ) {
    this.wrap = wrap
    this.element = element

    if (options) {
      this.options = options
    }
  }

  getOffsetX = (
    wrapRect: ClientRect,
    elRect: ClientRect,
  ) => {
    if (this.options.position === 'left') {
      return { left: `${wrapRect.left}px` }
    }

    return { right: `${document.body.scrollWidth - wrapRect.left - wrapRect.width}px` }
  }

  getOffsetY = (
    wrapRect: ClientRect,
    elRect: ClientRect,
  ) => {
    const { offsetY } = this.options
    const wrapTopPosition = window.scrollY + wrapRect.top
    const wrapBottomPosition = wrapTopPosition + wrapRect.height + offsetY

    const isBellowBottom = wrapBottomPosition + elRect.height > document.body.offsetHeight

    if (isBellowBottom) {
      return { top: `${wrapTopPosition - elRect.height - offsetY}px` }
    }

    return { top: `${wrapBottomPosition}px` }
  }

  getElementOffset = () => {
    const wrapRect = this.wrap.getBoundingClientRect()
    const elRect = this.element.getBoundingClientRect()

    return {
      ...this.getOffsetX(wrapRect, elRect),
      ...this.getOffsetY(wrapRect, elRect),
    }
  }
}
