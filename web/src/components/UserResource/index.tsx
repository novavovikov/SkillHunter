import cn from 'classnames'
import * as React from 'react'
import { ResourceType } from '../../types'
import { Icon, Menu } from '../../UI'
import * as s from './UserResource.css'

interface Props {
  data: ResourceType,
  handleLike: (resourceId: number, isLiked: boolean) => void
  handleRemove: (professionId: number, skillId: number, resourceId: number) => void
}

const UserResource: React.FC<Props> = ({ data, handleLike, handleRemove }) => {
  const url = new URL(data.link)

  const onLike = () => {
    handleLike(data.id, !data.isLiked)
  }

  const onRemove = () => {
    const {
      id,
      skillId,
      professionId,
    } = data

    handleRemove(professionId, skillId, id)
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

            <button
              className={cn(
                s.UserResource__status,
                s.UserResource__status_backlog,
              )}
            >
              {data.status}
            </button>
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
          <Menu>
            <button onClick={onRemove}>
              Remove
            </button>
          </Menu>

          <div className={s.UserResource__controls}>
            <a
              href={data.link}
              className={cn(s.UserResource__control, s.UserResource__control_more)}
              target="_blank"
            >
              More
            </a>
            <button
              className={s.UserResource__control}
            >
              <Icon type="share"/>
            </button>
            <button
              className={s.UserResource__control}
              onClick={onLike}
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
