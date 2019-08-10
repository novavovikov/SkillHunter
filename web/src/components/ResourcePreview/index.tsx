import cn from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ResourcePreviewInfo, ResourcePreviewStatus } from '../../components'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { EResourceStatus, IconTypes, IUserResource } from '../../types'
import { Icon, Item, Menu, Status } from '../../UI'
import { analytics } from '../../utils/analytics'
import { ShareMenu } from '../index'
import * as s from './ResourcePreview.css'

interface Props {
  eventCategory: string
  data: IUserResource,
  likeHandler: (data: ResourceLikeStatusSagaPayload) => void
  updateHandler: (data: Partial<IUserResource>) => void
  removeHandler: (data: Partial<IUserResource>) => void
}

class ResourcePreview extends React.Component<Props> {
  static defaultProps = {
    updateHandler: (data: Partial<IUserResource>) => {},
    removeHandler: (data: Partial<IUserResource>) => {},
  }

  handleStatus = (status: string) => {
    const {
      eventCategory,
      updateHandler,
      data: { id, userSkill },
    } = this.props

    updateHandler({
      id,
      userSkill,
      status,
    })

    analytics({
      event: 'click_status',
      source_status: status,
      category: eventCategory
    })
  }

  handleLike = () => {
    const { data, likeHandler, eventCategory } = this.props

    likeHandler({
      resourceId: data.resource.id,
      isLiked: !data.isLiked,
    })

    analytics({
      event: data.isLiked ? 'click_unlike' : 'click_like',
      source_title: data.title || data.resource.title || data.resource.link,
      category: eventCategory
    })
  }

  handleRemove = () => {
    const {
      removeHandler,
      data: {
        id,
        userSkill,
        title,
        resource
      },
      eventCategory
    } = this.props

    removeHandler({ id, userSkill })

    analytics({
      event: 'click_delete_source',
      source_title: title || resource.title || resource.link,
      category: eventCategory
    })
  }

  handleMore = () => {
    const { data, eventCategory } = this.props

    analytics({
      event: 'click_source_more',
      source_title: data.title || data.resource.title || data.resource.link,
      category: eventCategory
    })
  }

  render () {
    const { data } = this.props

    return (
      <div className={s.ResourcePreview}>
        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_info)}>
          <ResourcePreviewInfo
            eventCategory="skillset"
            data={data}
          />
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_status)}>
          <Menu
            position="left"
            Component={(props) => (
              <ResourcePreviewStatus
                status={data.status}
                className={cn(s.ResourcePreview__status, {
                  [s.ResourcePreview__status_backlog]: data.status === EResourceStatus.Backlog,
                  [s.ResourcePreview__status_plan]: data.status === EResourceStatus.Plan,
                  [s.ResourcePreview__status_done]: data.status === EResourceStatus.Done,
                })}
                {...props}
              />
            )}
          >
            {Object.keys(EResourceStatus).map(status => (
              <Item
                onClick={() => this.handleStatus(status)}
                key={status}
              >
                <Status value={status}/>
              </Item>
            ))}
          </Menu>
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_actions)}>
          <Link
            to={`${ROUTES.RESOURCE}/${data.id}`}
            className={s.ResourcePreview__control}
            onClick={this.handleMore}
          >
            More
            <Icon
              type={IconTypes.arrowRight}
              size="18"
            />
          </Link>

          <div className={s.ResourcePreview__control}>
            <ShareMenu
              link={`${ROUTES.RESOURCE}/${data.id}`}
              text={data.title}
              eventCategory="skillset"
            />
          </div>
          <button
            className={s.ResourcePreview__control}
            onClick={this.handleLike}
          >
            <span className={s.ResourcePreview__likes}>{data.likes}</span>
            <Icon
              type={data.isLiked ? IconTypes.heartFilled : IconTypes.heart}
              active={data.isLiked}
            />
          </button>

            <Menu className={s.ResourcePreview__menu}>
              <Item onClick={this.handleRemove}>
                Delete
              </Item>
            </Menu>
        </div>
      </div>
    )
  }
}

export default ResourcePreview
