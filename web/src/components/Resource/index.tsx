import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceStatusTypes, ResourceType } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import { ShareMenu } from '../index'
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
      <div className={s.Resource}>
        <div className={cn(s.Resource__col, s.Resource__col_info)}>
          <div className={s.Resource__type}>
            <img src={require(`./icons/${data.type}.svg`)} alt=""/>
          </div>

          <div className={s.Resource__info}>
            <h4 className={s.Resource__title}>
              {data.title}
            </h4>

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
        </div>

        <div className={cn(s.Resource__col, s.Resource__col_status)}>
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

        <div className={cn(s.Resource__col, s.Resource__col_actions)}>
          <a
            href={data.link}
            className={s.Resource__control}
            target="_blank"
          >
            More
            <Icon
              type="arrow-right"
              size="lg"
            />
          </a>

          {!shared && (
            <ShareMenu
              link={`${ROUTES.SHARE}?ids=[${data.id}]`}
              className={s.Resource__control}
            />
          )}
          <button
            className={s.Resource__control}
            onClick={this.handleLike}
          >
              <span className={s.Resource__likes}>
                {data.likes}
              </span>
            <Icon
              type={data.isLiked ? 'heart-filled' : 'heart'}
              active={data.isLiked}
            />
          </button>

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
        </div>
      </div>
    )
  }
}

export default Resource
