import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { EResourceStatus, IconTypes, IUserResource } from '../../types'
import { Icon, Item, Menu, Status } from '../../UI'
import { analytics } from '../../utils/analytics'
import { ResourceStatus, ShareMenu } from '../index'
import * as s from './ResourceHeader.css'

interface Props {
  data: IUserResource
  changeStatus: (status: EResourceStatus | string) => void
  handleLike: () => void
  onRemove: () => void
}

class ResourceHeader extends PureComponent<Props> {
  handleBack = () => {
    analytics({
      event: 'click_back',
      category: 'source_page'
    })
  }

  render () {
    const { data, changeStatus, onRemove, handleLike } = this.props

    return (
      <header className={s.ResourceHeader}>

        <Link
          to={ROUTES.SKILLSET}
          className={s.ResourceHeader__back}
          onClick={this.handleBack}
        >
          <Icon type={IconTypes.arrowLeft}/>
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
            {Object.keys(EResourceStatus).map(status => (
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
              type={data.isLiked ? IconTypes.heartFilled : IconTypes.heart}
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
            eventCategory="source_page"
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
