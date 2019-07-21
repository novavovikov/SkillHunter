import cn from 'classnames'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { ResourceStatusTypes, UserResourceType } from '../../types'
import { Icon, Item, Menu, Status } from '../../UI'
import { ResourceStatus, ShareMenu } from '../index'
import * as s from './ResourceHeader.css'

interface Props {
  data: UserResourceType
  changeStatus: (status: ResourceStatusTypes | string) => void
  handleLike: () => void
  onRemove: () => void
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
    const { data, changeStatus, onRemove, handleLike } = this.props

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
          <Menu
            Component={(props) => (
              <ResourceStatus
                status={data.status}
                {...props}
              />
            )}
          >
            {Object.keys(ResourceStatusTypes).map(status => (
              <Item
                key={status}
                onClick={() => changeStatus(status)}
              >
                <Status value={status}/>
              </Item>
            ))}
          </Menu>
        </div>

        <button
          className={s.ResourceHeader__item}
          onClick={handleLike}
        >
            <Icon
              type={data.isLiked ? 'heart-filled' : 'heart'}
              active={data.isLiked}
            />
          <span className={s.ResourceHeader__label}>
            {data.likes}
          </span>
        </button>

        <div className={s.ResourceHeader__item}>
          <ShareMenu
            link={`${ROUTES.RESOURCE}/${data.id}`}
            text={data.title}
            label="Share"
          />
        </div>
        {!data.viewOnly && (
          <div className={s.ResourceHeader__item}>
            <Menu label="More">
              <Item onClick={onRemove}>
                Delete
              </Item>
            </Menu>
          </div>
        )}
      </header>
    )
  }
}

export default ResourceHeader
