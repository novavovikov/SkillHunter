import cn from 'classnames'
import React, { Component, FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { IUserResource } from '../../types'
import { analytics } from '../../utils/analytics'
import faviconIcon from './icons/favicon.svg'
import { getIconByType } from './iconType'
import * as s from './ResourcePreviewInfo.css'

interface Props {
  className?: string
  data: IUserResource
}

class ResourcePreviewInfo extends Component<Props> {
  handleTitle = () => {
    const { data } = this.props

    analytics({
      event: 'click_source_name',
      source_url: data.title || data.resource.title || data.resource.link
    })
  }

  handleLink = () => {
    const { data } = this.props

    analytics({
      event: 'click_source_url',
      source_title: data.resource.link
    })
  }

  render () {
    const { data, className } = this.props
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
            onClick={this.handleTitle}
          >
            {data.title || data.resource.title || data.resource.link}
          </Link>

          {data.type !== 'book' && (
            <a
              href={data.resource.link}
              className={cn(s.ResourcePreviewInfo__source, s.ResourcePreviewInfo__source_site)}
              target="_blank"
              onClick={this.handleLink}
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
}

export default ResourcePreviewInfo
