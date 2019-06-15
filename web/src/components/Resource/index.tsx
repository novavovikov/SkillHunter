import cn from 'classnames'
import * as React from 'react'
import { ResourceType } from '../../types'
import * as s from './Resource.css'

interface Props {
  data: ResourceType
}

const Resource: React.FC<Props> = ({ data }) => {
  const url = new URL(data.link)

  return (
    <div
      className={cn(s.Resource, {
        [s.Resource_article]: data.type === 'article',
      })}
    >
      <div className={s.Resource__content}>
        <div className={s.Resource__header}>
          <h4 className={s.Resource__title}>
            {data.title}
          </h4>

          <button
            className={cn(
              s.Resource__status,
              s.Resource__status_backlog,
            )}
          >
            Backlog
          </button>
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
          {url.hostname}
        </a>
      </div>
    </div>
  )
}

export default Resource
