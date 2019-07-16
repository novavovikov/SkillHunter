import cn from 'classnames'
import React, { createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'
import withClickOutside from 'react-click-outside'
import { Animation, Icon } from '../index'
import * as s from './Menu.css'

interface Props {
  className?: string
  icon?: string
  position?: 'left'
}

interface State {
  isOpen: boolean
}

const getIconSize = (icon: string) => {
  if (icon === 'dots') {
    return 'xl'
  }

  return null
}

class Menu extends React.Component<Props, State> {
  btnRef = createRef<HTMLButtonElement>()

  state = {
    isOpen: false,
  }

  handleClickOutside () {
    this.hideMenu()
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })

    document.body.classList.toggle(s.Menu__body)
  }

  hideMenu = () => {
    this.setState({
      isOpen: false,
    })
    document.body.classList.remove(s.Menu__body)
  }

  getOffsetY = (params: ClientRect, menu: HTMLDivElement) => {
    const top = params.top + params.height

    if (top + menu.clientHeight + 25 < window.innerHeight) {
      return { top: `${top}px` }
    }

    return {
      bottom: `${window.innerHeight - params.bottom + params.height}px`,
    }
  }

  getOffsetX = (params: ClientRect, menu: HTMLDivElement) => {
    const { position } = this.props

    if (position === 'left') {
      return { left: `${params.left}px` }
    }

    return { right: `${window.innerWidth - params.left - params.width}px` }
  }

  getMenuOffset (btn: HTMLButtonElement, menu: HTMLDivElement) {
    const params = btn.getBoundingClientRect()
    const offsetX = this.getOffsetX(params, menu)
    const offsetY = this.getOffsetY(params, menu)

    return { ...offsetX, ...offsetY }
  }

  setMenuPosition = (element: HTMLDivElement) => {
    const { current } = this.btnRef
    if (!current) {

      return null
    }

    const styles = this.getMenuOffset(current, element)

    Object.assign(element.style, styles)
  }

  render () {
    const { className, icon, children } = this.props
    const { isOpen } = this.state

    const IconName: string = icon || 'dots'
    const childrenList = React.Children.toArray(children)

    return (
      <div
        className={cn(s.Menu, className)}
        onClick={this.toggleMenu}
      >
        <button
          className={s.Menu__button}
          ref={this.btnRef}
        >
          <Icon
            type={IconName}
            size={getIconSize(IconName)}
            active={isOpen}
          />
        </button>
        {createPortal(
          (
            <Animation.Dropdown
              in={isOpen}
              onEnter={this.setMenuPosition}>
              <div className={s.Menu__list}>
                {React.Children.map(childrenList, (child: ReactElement) => (
                  React.cloneElement(child, {
                    onClose: this.hideMenu,
                  })
                ))}
              </div>
            </Animation.Dropdown>
          ),
          document.body,
        )}
      </div>
    )
  }
}

export default withClickOutside(Menu)
