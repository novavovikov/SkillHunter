import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
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

        <Link
          to={ROUTES.SKILLSET}
          className={s.ResourceHeader__back}
        >
          <Icon type="arrow-left"/>
          Back
        </Link>

        <div className={s.ResourceHeader__item}>
            <Icon
              type="dots"
              size="18"
            />
          <div className={s.ResourceHeader__label}>
            {data.status}
          </div>
        </div>
        <button className={s.ResourceHeader__item}>
            <Icon
              type={data.isLiked ? 'heart-filled' : 'heart'}
              active={data.isLiked}
              size="18"
            />
          <span className={s.ResourceHeader__label}>
            {data.likes}
          </span>
        </button>
        <div className={s.ResourceHeader__item}>
            <Icon
              type="share"
              size="18"
            />
          <div className={s.ResourceHeader__label}>
            Share
          </div>
        </div>
        <div className={s.ResourceHeader__item}>
            <Icon
              type="add"
              size="18"
            />
          <div className={s.ResourceHeader__label}>
            2 skills
          </div>
        </div>
        <div className={s.ResourceHeader__item}>
            <Icon
              type="dots"
              size="18"
            />
          <div className={s.ResourceHeader__label}>
            More
          </div>
        </div>
      </header>
    )
  }
}

export default ResourceHeader
