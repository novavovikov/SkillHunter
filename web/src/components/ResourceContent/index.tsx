import cn from 'classnames'
import React, { Component } from 'react'
import { Loader } from '../../UI'
import { ajax } from '../../utils/ajax'
import { getUrl, urlNormalizer, validateUrl } from '../../utils/url'
import { getVideoURL } from '../../utils/video'
import * as s from './ResourceContent.css'
import { IResource } from '../../types'

interface Props {
  data: IResource
}

class ResourceContent extends Component<Props> {
  getFormattedDate = (date: string) => {
    if (isNaN(Date.parse(date))) {
      return date
    }

    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  getImageUrl = (url: string) => {
    const isValid = validateUrl(url)

    if (isValid) {
      return url
    }

    const { data } = this.props
    const link = getUrl(data.link)

    if (!link) {
      return url
    }

    return urlNormalizer(`${link.origin}/${url}`)
  }

  render () {
    const {
      link,
      date,
      title,
      text,
      image
    } = this.props.data

    const videoUrl = getVideoURL(link)

    return (
      <>
        <div className={s.ResourceContent}>
          {videoUrl && (
            <div className={s.ResourceContent__video}>
              <iframe
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {!videoUrl && image && (
            <img
              className={s.ResourceContent__img}
              src={this.getImageUrl(image)}
              alt={title}
            />
          )}

          {date && (
            <div className={s.ResourceContent__date}>
              {this.getFormattedDate(date)}
            </div>
          )}

          <div className={s.ResourceContent__text}>
            {text}
          </div>
        </div>
      </>
    )
  }
}

export default ResourceContent
