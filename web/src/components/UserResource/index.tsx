import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceStatusTypes, ResourceType } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import * as s from './UserResource.css'

interface Props {
  data: ResourceType,
  likeHandler: (data: ResourceLikeStatusSagaPayload) => void
  updateHandler: (data: Partial<ResourceType>) => void
  removeHandler: (data: ResourceSagaPayload) => void
}

const UserResource: React.FC<Props> = ({ data, updateHandler, likeHandler, removeHandler }) => {
  const url = new URL(data.link)

  const handleStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      id,
      skillId,
      professionId,
    } = data

    updateHandler({
      id,
      skillId,
      professionId,
      status: e.target.value,
    })
  }

  const handleLike = () => {
    likeHandler({
      resourceId: data.id,
      isLiked: !data.isLiked,
    })
  }

  const handleRemove = () => {
    const {
      professionId,
      skillId,
      id: resourceId,
    } = data

    removeHandler({
      professionId,
      skillId,
      resourceId,
    })
  }

  return (
    <div
      className={cn(s.UserResource, {
        [s.UserResource_article]: data.type === 'article',
      })}
    >
      <div className={s.UserResource__content}>
        <div className={s.UserResource__info}>
          <div className={s.UserResource__header}>
            <h4 className={s.UserResource__title}>
              {data.title}
            </h4>

            {data.status && (
              <div
                className={cn(
                  s.UserResource__status,
                  {
                    [s.UserResource__status_backlog]: data.status === ResourceStatusTypes.Backlog,
                    [s.UserResource__status_plan]: data.status === ResourceStatusTypes.Plan,
                    [s.UserResource__status_done]: data.status === ResourceStatusTypes.Done,
                  },
                )}
              >
                <select
                  className={s.UserResource__select}
                  value={data.status}
                  onChange={handleStatus}
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
            className={s.UserResource__site}
            target="_blank"
          >
          <span className={s.UserResource__favicon}>
            <img
              src={data.icon}
              alt=""
            />
          </span>
            {url.hostname}
          </a>
        </div>

        <div className={s.UserResource__sidebar}>
          <Menu className={s.UserResource__menu}>
            <Item>
              Edit
            </Item>
            <Item onClick={handleRemove}>
              Delete
            </Item>
          </Menu>

          <div className={s.UserResource__controls}>
            <a
              href={data.link}
              className={cn(s.UserResource__control, s.UserResource__control_more)}
              target="_blank"
            >
              More
            </a>
            <Link
              to={`${ROUTES.SHARE}?ids=[${data.id}]`}
              className={s.UserResource__control}
            >
              <Icon type="share"/>
            </Link>
            <button
              className={s.UserResource__control}
              onClick={handleLike}
            >
              <span className={s.UserResource__likes}>
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

export default UserResource
