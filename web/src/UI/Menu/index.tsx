import cn from 'classnames'
import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import * as s from './Menu.css'

interface Props {
  className?: string
}

interface State {
  isOpen: boolean
}

class MenuButton extends React.Component<Props, State> {
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
    const { className, children } = this.props
    const { isOpen } = this.state

    return (
      <div
        className={cn(s.Menu, className)}
        onMouseEnter={this.showMenu}
        onMouseLeave={this.hideMenu}
      >
        <button className={s.Menu__button}>
          <i className={s.Menu__dots}/>
        </button>
        <CSSTransition
          in={isOpen}
          timeout={250}
          unmountOnExit
          classNames={{
            enterActive: s.Menu__enter,
            enterDone: s.Menu__enter_active,
            exit: s.Menu__exit,
            exitActive: s.Menu__exit_active,
          }}
        >
          <div className={s.Menu__list}>
            {children}
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default MenuButton
