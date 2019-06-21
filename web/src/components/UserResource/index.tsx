import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceStatusTypes, ResourceType } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import * as s from './UserResource.css'

interface Props {
  data: ResourceType,
  handleLike: (resourceId: number, isLiked: boolean) => void
  handleRemove: (data: ResourceSagaPayload) => void
  handleStatus: (professionId: number, skillId: number, resourceId: number, status: string) => void
}

const UserResource: React.FC<Props> = ({ data, handleLike, handleRemove, handleStatus }) => {
  const url = new URL(data.link)

  const changeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      id,
      skillId,
      professionId,
    } = data

    handleStatus(
      professionId,
      skillId,
      id,
      e.target.value,
    )
  }

  const onLike = () => {
    handleLike(data.id, !data.isLiked)
  }

  const onRemove = () => {
    const {
      professionId,
      skillId,
      id: resourceId,
    } = data

    handleRemove({
      professionId,
      skillId,
      resourceId
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
                onChange={changeStatus}
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
            <Item onClick={onRemove}>
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
