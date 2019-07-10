import cn from 'classnames'
import React, { PureComponent } from 'react'
import * as s from './ResourceHeader.css'

interface State {
  fixedClass: boolean
}

class ResourceHeader extends PureComponent<{}, State> {
  state = {
    fixedClass: false,
  }

  componentDidMount (): void {
    window.addEventListener('scroll', this.checkWindowPosition)
  }

  componentWillUnmount (): void {
    window.removeEventListener('scroll', this.checkWindowPosition)
  }

  checkWindowPosition = () => {
    this.setState({ fixedClass: window.scrollY > 0 })
  }

  render () {
    const { fixedClass } = this.state

    return (
      <header className={cn(s.ResourceHeader, {
        [s.ResourceHeader_fixed]: fixedClass,
      })}>
        <div className={s.ResourceHeader__item}>
          Backlog
        </div>
        <div className={s.ResourceHeader__item}>
          1000000
        </div>
        <div className={s.ResourceHeader__item}>
          Share
        </div>
        <div className={s.ResourceHeader__item}>
          2 skills
        </div>
        <div className={s.ResourceHeader__item}>
          More
        </div>
      </header>
    )
  }
}

export default ResourceHeader
