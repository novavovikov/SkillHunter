import cn from 'classnames'
import React, { createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'
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

  showMenu = () => {
    this.setState({
      isOpen: true,
    })
  }

  hideMenu = () => {
    this.setState({
      isOpen: false,
    })
  }

  setMenuPosition = (element: HTMLDivElement) => {
    const { current } = this.btnRef

    if (!current) {
      return null
    }

    const params = current.getBoundingClientRect()

    Object.assign(element.style, {
      top: `${params.top + params.height}px`,
      left: `${params.left}px`
    })
  }

  render () {
    const { className, icon, position, children } = this.props
    const { isOpen } = this.state

    const IconName: string = icon || 'dots'
    const childrenList = React.Children.toArray(children)

    return (
      <div
        className={cn(s.Menu, className)}
        onMouseEnter={this.showMenu}
        onMouseLeave={this.hideMenu}
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
              <div
                className={cn(s.Menu__list, {
                  [s.Menu__list]: position === 'left',
                })}
              >
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

export default Menu
