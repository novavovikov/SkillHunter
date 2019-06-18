import cn from 'classnames'
import * as React from 'react'
import withClickOutside from 'react-click-outside'
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

  handleClickOutside () {
    this.setState({
      isOpen: false
    })
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { className, children } = this.props
    const { isOpen } = this.state

    return (
      <div className={cn(
        s.Menu,
        className,
      )}>
        <button
          className={s.Menu__button}
          onClick={this.toggleMenu}
        >
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

export default withClickOutside(MenuButton)
