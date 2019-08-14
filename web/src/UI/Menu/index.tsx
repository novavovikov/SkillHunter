import cn from 'classnames'
import React, { createRef, FC } from 'react'
import { createPortal } from 'react-dom'
import { IconSizes, IconTypes } from '../../types'
import { Animation, Icon, OutsideClickWrapper } from '../index'
import { ElementOffsetPosition } from './helpers'
import * as s from './Menu.css'

interface ComponentProps {
  isOpen: boolean
}

interface Props {
  className?: string
  icon: IconTypes
  size: IconSizes,
  label?: string
  Component?: FC<ComponentProps>
  position?: 'left'
}

interface State {
  isOpen: boolean
}

class Menu extends React.Component<Props, State> {
  static defaultProps = {
    icon: IconTypes.dots,
    size: '16'
  }

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
    const elementOffsetPosition = new ElementOffsetPosition(
      current,
      element,
      {
        position,
        offsetY: 10,
      },
    )

    Object.assign(element.style, elementOffsetPosition.getElementOffset())
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
      size,
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
                  size={size}
                  active={isOpen}
                />
                {label && (
                  <span className={cn(s.Menu__label, {
                    [s.Menu__label_24]: size === '24'
                  })}>
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
