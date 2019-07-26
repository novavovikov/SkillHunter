import React, { FC } from 'react'
import { Icon } from '../../UI'
import cn from 'classnames'
import s from './ResourceInfo.css'

interface Props {
  type: string
  author: string | null
  link?: string
}

const ResourceInfo: FC<Props> = (props) => {
  const { type, author, link } = props

  const url: URL | null = link ? new URL(link) : null

  return (
    <div className={s.ResourceInfo}>
      <div className={cn(s.ResourceInfo__item, s.ResourceInfo__item_upperCase)}>
        {type}
      </div>

      {author && (
        <div className={cn(s.ResourceInfo__item, s.ResourceInfo__item_upperCase)}>
          {author}
        </div>
      )}

      {type !== 'book' && (
        <div className={s.ResourceInfo__item}>
          See original
          <Icon
            type="arrow-right"
            className={s.ResourceInfo__icon}
          />
          {url && (
            <a
              href={link}
              className={s.ResourceInfo__link}
              target="_blank"
            >
              {url.hostname}
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default ResourceInfo
