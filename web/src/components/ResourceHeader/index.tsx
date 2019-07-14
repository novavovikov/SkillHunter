import cn from 'classnames'
import React, { PureComponent } from 'react'
import { UserResourceType } from '../../types'
import { Icon } from '../../UI'
import * as s from './ResourceHeader.css'

interface Props {
  data: UserResourceType
}

interface State {
  fixedClass: boolean
}

class ResourceHeader extends PureComponent<Props, State> {
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
    const { data } = this.props

    return (
      <header className={cn(s.ResourceHeader, {
        [s.ResourceHeader_fixed]: fixedClass,
      })}>
        <div className={s.ResourceHeader__item}>
          <div className={s.ResourceHeader__icon}>
            <Icon
              type="dots"
              size="18"
            />
          </div>
          {data.status}
        </div>
        <div className={s.ResourceHeader__item}>
          <div className={s.ResourceHeader__icon}>
            <Icon
              type="heart"
              size="18"
            />
          </div>
          {data.likes}
        </div>
        <div className={s.ResourceHeader__item}>
          <div className={s.ResourceHeader__icon}>
            <Icon
              type="share"
              size="18"
            />
          </div>
          Share
        </div>
        <div className={s.ResourceHeader__item}>
          <div className={s.ResourceHeader__icon}>
            <Icon
              type="add"
              size="18"
            />
          </div>
          2 skills
        </div>
        <div className={s.ResourceHeader__item}>
          <div className={s.ResourceHeader__icon}>
            <Icon
              type="dots"
              size="18"
            />
          </div>
          More
        </div>
      </header>
    )
  }
}

export default ResourceHeader
