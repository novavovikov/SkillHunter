import cn from 'classnames'
import React, { createRef, FC } from 'react'
import { createPortal } from 'react-dom'
import { IconTypes } from '../../types'
import { Animation, Icon, OutsideClickWrapper } from '../index'
import { getElementOffset } from './helpers'
import * as s from './Menu.css'

interface ComponentProps {
  isOpen: boolean
}

interface Props {
  className?: string
  icon?: IconTypes
  label?: string
  Component?: FC<ComponentProps>
  position?: 'left'
}

interface State {
  isOpen: boolean
}

const getIconSize = (iconType: IconTypes) => {
  if (iconType === IconTypes.dots) {
    return '24'
  }

  return null
}

class Menu extends React.Component<Props, State> {
  menuRef = createRef<HTMLDivElement>()

  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  hideMenu = () => {
    this.setState({
      isOpen: false,
    })
  }

  setMenuPosition = (element: HTMLElement) => {
    const { current } = this.menuRef

    if (!current) {
      return null
    }

    const { position } = this.props
    const styles = getElementOffset(current, element, position)

    Object.assign(element.style, styles)
  }

  onEnterList = (el: HTMLElement) => {
    this.setMenuPosition(el)
    window.addEventListener('resize', () => this.setMenuPosition(el))
  }

  onExitList = (el: HTMLElement) => {
    window.removeEventListener('resize', () => this.setMenuPosition(el))
  }

  render () {
    const { isOpen } = this.state
    const {
      Component,
      className,
      icon,
      label,
      children,
    } = this.props

    const iconType: IconTypes = icon || IconTypes.dots

    return (
      <OutsideClickWrapper
        className={cn(s.Menu, className)}
        handler={this.hideMenu}
      >
        <div
          ref={this.menuRef}
          onClick={this.toggleMenu}
        >
          {Component
            ? <Component isOpen={isOpen}/>
            : (
              <button className={cn(s.Menu__button, s.Menu__button_withLabel)}>
                <Icon
                  type={iconType}
                  size={getIconSize(iconType)}
                  active={isOpen}
                />
                {label && (
                  <span className={s.Menu__label}>
                    {label}
                  </span>
                )}
              </button>
            )
          }
        </div>

        {createPortal(
          (
            <Animation.Dropdown
              in={isOpen}
              onEnter={this.onEnterList}
              onExit={this.onExitList}
            >
              <div className={s.Menu__list}>
                {children}
              </div>
            </Animation.Dropdown>
          ),
          document.body,
        )}
      </OutsideClickWrapper>
    )
  }
}

export default Menu
