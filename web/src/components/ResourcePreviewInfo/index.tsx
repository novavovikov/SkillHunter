import cn from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { IUserResource } from '../../types'
import faviconIcon from './icons/favicon.svg'
import { getIconByType } from './iconType'
import * as s from './ResourcePreviewInfo.css'

interface Props {
  className?: string
  data: IUserResource
}

const ResourcePreviewInfo: FC<Props> = ({ className, data }) => {
  const url: any = (link: string) => new URL(link)

  return (
    <div className={cn(s.ResourcePreviewInfo, className)}>
      <div className={s.ResourcePreviewInfo__type}>
        <img src={getIconByType(data.type)} alt=""/>
      </div>

      <div className={s.ResourcePreviewInfo__data}>
        <Link
          to={`${ROUTES.RESOURCE}/${data.id}`}
          className={s.ResourcePreviewInfo__title}
        >
          {data.title || data.resource.title || data.resource.link}
        </Link>

        {data.type !== 'book' && (
          <a
            href={data.resource.link}
            className={cn(s.ResourcePreviewInfo__source, s.ResourcePreviewInfo__source_site)}
            target="_blank"
          >
            <div className={s.ResourcePreviewInfo__favicon}>
              <img
                src={data.resource.picture || faviconIcon}
                alt=""
              />
            </div>
            {url(data.resource.link).hostname}
          </a>
        )}

        {data.type === 'book' && (
          <div className={s.ResourcePreviewInfo__source}>
            {data.author}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResourcePreviewInfo
