import cn from 'classnames'
import React, { createRef, FC } from 'react'
import withClickOutside from 'react-click-outside'
import { createPortal } from 'react-dom'
import { Animation, Icon } from '../index'
import { getElementOffset } from './helpers'
import * as s from './Menu.css'

interface ComponentProps {
  isOpen: boolean
}

interface Props {
  className?: string
  icon?: string
  label?: string
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
  }

  hideMenu = () => {
    this.setState({
      isOpen: false,
    })
  }

  setMenuPosition = (element: HTMLDivElement) => {
    const { current } = this.menuRef

    if (!current) {
      return null
    }

    const { position } = this.props
    const styles = getElementOffset(current, element, position)

    Object.assign(element.style, styles)
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
              <button className={cn(s.Menu__button, s.Menu__button_withLabel)}>
                <Icon
                  type={IconName}
                  size={getIconSize(IconName)}
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
