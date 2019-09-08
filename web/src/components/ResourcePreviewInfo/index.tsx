import cn from 'classnames'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { EResourceTypes, IUserResource } from '../../types'
import { analytics } from '../../utils/analytics'
import favicon from './icons/favicon.svg'
import { getIconByType } from './iconType'
import * as s from './ResourcePreviewInfo.css'
import { WELCOME_RESOURCE_ID } from '../../constants/welcome'

interface Props {
  eventCategory: string
  className?: string
  data: IUserResource
}

class ResourcePreviewInfo extends Component<Props> {
  handleTitle = () => {
    const { data, eventCategory } = this.props

    analytics({
      event: 'click_source_name',
      source_url: data.title || data.resource.title || data.resource.link,
      category: eventCategory
    })
  }

  handleLink = () => {
    const { data, eventCategory } = this.props

    analytics({
      event: 'click_source_url',
      source_title: data.resource.link,
      category: eventCategory
    })
  }

  render () {
    const { data, className } = this.props
    const url = (link: string) => new URL(link)

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

          {data.type !== EResourceTypes.Book && (
            <a
              href={data.resource.id === WELCOME_RESOURCE_ID
                ? `${ROUTES.RESOURCE}/${data.id}`
                : data.resource.link
              }
              className={cn(s.ResourcePreviewInfo__source, s.ResourcePreviewInfo__source_site)}
              onClick={this.handleLink}
              target="_blank"
            >
              <div className={s.ResourcePreviewInfo__favicon}>
                <img
                  src={data.resource.icon || favicon}
                  alt=""
                />
              </div>
              {url(data.resource.link).hostname}
            </a>
          )}

          {data.type === EResourceTypes.Book && (
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
