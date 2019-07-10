import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceStatusTypes, ResourceType } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import { ShareMenu } from '../index'
import articleIcon from './icons/article.svg'
import bookIcon from './icons/book.svg'
import courseIcon from './icons/course.svg'
import faviconIcon from './icons/favicon.svg'
import mediaIcon from './icons/media.svg'
import * as s from './ResourcePreview.css'

const getIconByType = (type: string) => {
  switch (type) {
    case 'article':
      return articleIcon
    case 'media':
      return mediaIcon
    case 'book':
      return bookIcon
    case 'course':
      return courseIcon
    default:
      return articleIcon
  }
}

interface Props {
  data: ResourceType,
  shared?: boolean
  likeHandler: (data: ResourceLikeStatusSagaPayload) => void
  updateHandler: (data: Partial<ResourceType>) => void
  removeHandler: (data: Partial<ResourceSagaPayload>) => void
}

class ResourcePreview extends React.Component<Props> {
  static defaultProps = {
    updateHandler: (data: Partial<ResourceType>) => {},
    removeHandler: (data: ResourceSagaPayload) => {},
  }

  get url () {
    return new URL(this.props.data.link)
  }

  handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      updateHandler,
      data: {
        id,
        skillId,
        skillsetId,
      },
    } = this.props

    updateHandler({
      id,
      skillId,
      skillsetId,
      status: e.target.value,
    })
  }

  handleLike = () => {
    const { data, likeHandler } = this.props

    likeHandler({
      resourceId: data.id,
      isLiked: !data.isLiked,
    })
  }

  handleRemove = () => {
    const {
      removeHandler,
      data: {
        skillsetId,
        skillId,
        id: resourceId,
      },
    } = this.props

    removeHandler({
      skillsetId,
      skillId,
      resourceId,
    })
  }

  render () {
    const { data, shared } = this.props

    return (
      <div className={s.ResourcePreview}>
        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_info)}>
          <div className={s.ResourcePreview__type}>
            <img src={getIconByType(data.type)} alt=""/>
          </div>

          <div className={s.ResourcePreview__info}>
            <h4 className={s.ResourcePreview__title}>
              {data.userTitle || data.title || data.link}
            </h4>

            {data.type !== 'book' && (
              <a
                href={data.link}
                className={cn(s.ResourcePreview__source, s.ResourcePreview__source_site)}
                target="_blank"
              >
          <span className={s.ResourcePreview__favicon}>
            <img
              src={data.picture || faviconIcon}
              alt=""
            />
          </span>
                {this.url.hostname}
              </a>
            )}

            {data.type === 'book' && (
              <div className={s.ResourcePreview__source}>
                {data.author}
              </div>
            )}

          </div>
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_status)}>
          {!shared && (
            <div
              className={cn(
                s.ResourcePreview__status,
                {
                  [s.ResourcePreview__status_backlog]: data.status === ResourceStatusTypes.Backlog,
                  [s.ResourcePreview__status_plan]: data.status === ResourceStatusTypes.Plan,
                  [s.ResourcePreview__status_done]: data.status === ResourceStatusTypes.Done,
                },
              )}
            >
              <select
                className={s.ResourcePreview__select}
                value={data.status}
                onChange={this.handleStatus}
              >
                <option>
                  {ResourceStatusTypes.Backlog}
                </option>
                <option>
                  {ResourceStatusTypes.Plan}
                </option>
                <option>
                  {ResourceStatusTypes.Done}
                </option>
              </select>
            </div>
          )}
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_actions)}>
          <a
            href={data.link}
            className={s.ResourcePreview__control}
            target="_blank"
          >
            More
            <Icon
              type="arrow-right"
              size="18"
            />
          </a>

          {!shared && (
            <div className={s.ResourcePreview__control}>
              <ShareMenu
                link={`${ROUTES.SHARE}?ids=${data.id}`}
                text={data.title}
              />
            </div>
          )}
          <button
            className={s.ResourcePreview__control}
            onClick={this.handleLike}
          >
              <span className={s.ResourcePreview__likes}>
                {data.likes}
              </span>
            <Icon
              type={data.isLiked ? 'heart-filled' : 'heart'}
              active={data.isLiked}
            />
          </button>

          {!shared && (
            <Menu className={s.ResourcePreview__menu}>
              <Item>
                Edit
              </Item>
              <Item onClick={this.handleRemove}>
                Delete
              </Item>
            </Menu>
          )}
        </div>
      </div>
    )
  }
}

export default ResourcePreview
