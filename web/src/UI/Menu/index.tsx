import cn from 'classnames'
import React, { createRef, FC } from 'react'
import withClickOutside from 'react-click-outside'
import { createPortal } from 'react-dom'
import { Animation, Icon } from '../index'
import * as s from './Menu.css'

interface ComponentProps {
  isOpen: boolean
}

interface Props {
  className?: string
  icon?: string
  Component?: FC<ComponentProps>
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
  menuRef = createRef<HTMLDivElement>()

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

  getMenuOffset (wrap: HTMLDivElement, menu: HTMLDivElement) {
    const params = wrap.getBoundingClientRect()
    const offsetX = this.getOffsetX(params, menu)
    const offsetY = this.getOffsetY(params, menu)

    return { ...offsetX, ...offsetY }
  }

  setMenuPosition = (element: HTMLDivElement) => {
    const { current } = this.menuRef
    if (!current) {

      return null
    }

    const styles = this.getMenuOffset(current, element)

    Object.assign(element.style, styles)
  }

  render () {
    const { isOpen } = this.state
    const {
      Component,
      className,
      icon,
      children,
    } = this.props

    const IconName: string = icon || 'dots'

    return (
      <>
        <div
          className={cn(s.Menu, className)}
          ref={this.menuRef}
          onClick={this.toggleMenu}
        >
          {Component
            ? <Component isOpen={isOpen}/>
            : (
              <button className={s.Menu__button}>
                <Icon
                  type={IconName}
                  size={getIconSize(IconName)}
                  active={isOpen}
                />
              </button>
            )
          }
        </div>

        {createPortal(
          (
            <Animation.Dropdown
              in={isOpen}
              onEnter={this.setMenuPosition}
            >
              <div className={s.Menu__list}>
                {children}
              </div>
            </Animation.Dropdown>
          ),
          document.body,
        )}
      </>
    )
  }
}

export default withClickOutside(Menu)
