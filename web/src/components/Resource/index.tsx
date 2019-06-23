import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceStatusTypes, ResourceType } from '../../types'
import { ShareMenu } from '../index'
import { Icon, Item, Menu } from '../../UI'
import * as s from './Resource.css'

interface Props {
  data: ResourceType,
  shared?: boolean
  likeHandler: (data: ResourceLikeStatusSagaPayload) => void
  updateHandler: (data: Partial<ResourceType>) => void
  removeHandler: (data: ResourceSagaPayload) => void
}

class Resource extends React.Component<Props> {
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
        professionId,
      },
    } = this.props

    updateHandler({
      id,
      skillId,
      professionId,
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
        professionId,
        skillId,
        id: resourceId,
      },
    } = this.props

    removeHandler({
      professionId,
      skillId,
      resourceId,
    })
  }

  render () {
    const { data, shared } = this.props

    return (
      <div
        className={cn(s.Resource, {
          [s.Resource_article]: data.type === 'article',
        })}
      >
        <div className={s.Resource__content}>
          <div className={s.Resource__info}>
            <div className={s.Resource__header}>
              <h4 className={s.Resource__title}>
                {data.title}
              </h4>

              {!shared && (
                <div
                  className={cn(
                    s.Resource__status,
                    {
                      [s.Resource__status_backlog]: data.status === ResourceStatusTypes.Backlog,
                      [s.Resource__status_plan]: data.status === ResourceStatusTypes.Plan,
                      [s.Resource__status_done]: data.status === ResourceStatusTypes.Done,
                    },
                  )}
                >
                  <select
                    className={s.Resource__select}
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

            <a
              href={data.link}
              className={s.Resource__site}
              target="_blank"
            >
          <span className={s.Resource__favicon}>
            <img
              src={data.icon}
              alt=""
            />
          </span>
              {this.url.hostname}
            </a>
          </div>

          <div className={s.Resource__sidebar}>
            {!shared && (
              <Menu className={s.Resource__menu}>
                <Item>
                  Edit
                </Item>
                <Item onClick={this.handleRemove}>
                  Delete
                </Item>
              </Menu>
            )}

            <div className={s.Resource__controls}>
              <a
                href={data.link}
                className={cn(s.Resource__control, s.Resource__control_more)}
                target="_blank"
              >
                More
              </a>
              {!shared && (
                <ShareMenu link={`${ROUTES.SHARE}?ids=[${data.id}]`}/>
              )}
              <button
                className={s.Resource__control}
                onClick={this.handleLike}
              >
              <span className={s.Resource__likes}>
                {data.likes}
              </span>
                <Icon type={data.isLiked ? 'heart-filled' : 'heart'}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Resource
