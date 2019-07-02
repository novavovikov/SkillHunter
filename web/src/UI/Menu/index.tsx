import cn from 'classnames'
import React, { ReactChild, ReactElement, ReactNode } from 'react'
import { Animation, Icon } from '../index'
import * as s from './Menu.css'

interface Props {
  className?: string
  icon?: string
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

  render () {
    const { className, icon, children } = this.props
    const { isOpen } = this.state

    const IconName: string = icon || 'dots'
    const childrenList = React.Children.toArray(children)

    return (
      <div
        className={cn(s.Menu, className)}
        onMouseEnter={this.showMenu}
        onMouseLeave={this.hideMenu}
      >
        <button className={s.Menu__button}>
          <Icon
            type={IconName}
            size={getIconSize(IconName)}
            active={isOpen}
          />
        </button>
        <Animation.Dropdown in={isOpen}>
          <div className={s.Menu__list}>
            {React.Children.map(childrenList, (child: ReactElement) => (
              React.cloneElement(child, {
                onClose: this.hideMenu
              })
            ))}
          </div>
        </Animation.Dropdown>
      </div>
    )
  }
}

export default Menu
