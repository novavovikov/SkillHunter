import cn from 'classnames'
import React, { Component } from 'react'
import { Loader } from '../../UI'
import { ajax } from '../../utils/ajax'
import { getUrl, urlNormalizer, validateUrl } from '../../utils/url'
import { getVideoURL } from '../../utils/video'
import * as s from './ResourceContent.css'

interface IResourceContent {
  author: string[]
  canonicalLink: string
  copyright: string | null
  date: string
  description: string
  image: string | null
  lang: string
  links: any
  publisher: string
  softTitle: string
  tags: string[]
  text: string | null
  title: string
  videos: any[]
}

interface Props {
  resourceId: number
}

interface State {
  isLoading: boolean
  resourceContent: any
}

class ResourceContent extends Component<Props, State> {
  state = {
    isLoading: true,
    resourceContent: null,
  }

  async componentDidMount () {
    const { resourceId } = this.props

    try {
      const { data } = await ajax.get(`resource/${resourceId}/content`)

      this.setState({
        isLoading: false,
        resourceContent: data as IResourceContent,
      })
    } catch (e) {
      this.setState({ isLoading: false })
      console.warn(e)
    }
  }

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

    const { resourceContent }: State = this.state
    const link = getUrl(resourceContent.canonicalLink)

    if (!link) {
      return url
    }

    return urlNormalizer(`${link.origin}/${url}`)
  }

  render () {
    const { resourceContent, isLoading }: State = this.state

    if (isLoading) {
      return (
        <div className={cn(s.ResourceContent, s.ResourceContent_loader)}>
          <Loader size="s"/>
        </div>
      )
    }

    const {
      canonicalLink,
      date,
      title,
      text,
      image
    } = resourceContent

    const videoUrl = getVideoURL(canonicalLink)

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
