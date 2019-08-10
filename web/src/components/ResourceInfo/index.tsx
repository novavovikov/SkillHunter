import cn from 'classnames'
import React, { Component } from 'react'
import { IconTypes } from '../../types'
import { Icon } from '../../UI'
import { analytics } from '../../utils/analytics'
import s from './ResourceInfo.css'

interface Props {
  type: string
  author: string | null
  link?: string
}

class ResourceInfo extends Component<Props> {
  handleLink = () => {
    const { link } = this.props

    analytics({
      event: 'click_see_original_link',
      source_url: link,
      category: 'source_page'
    })
  }

  render () {
    const { type, author, link } = this.props
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
              type={IconTypes.arrowRight}
              className={s.ResourceInfo__icon}
            />
            {url && (
              <a
                href={link}
                className={s.ResourceInfo__link}
                target="_blank"
                onClick={this.handleLink}
              >
                {url.hostname}
              </a>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default ResourceInfo
