import React, { Component } from 'react'
import { ajax } from '../../utils/ajax'
import { getUrl, urlNormalizer, validateUrl } from '../../utils/url'
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
  resourceContent: any
}

class ResourceContent extends Component<Props, State> {
  state = {
    resourceContent: null,
  }

  async componentDidMount () {
    const { resourceId } = this.props

    try {
      const { data } = await ajax.get(`resource/${resourceId}/content`)

      this.setState({
        resourceContent: data as IResourceContent,
      })
    } catch (e) {
      console.warn(e)
    }
  }

  getFormattedDate = (date: string) => {
    const dateObj = new Date(date)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return dateObj.toLocaleDateString('en', options)
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
    const { resourceContent }: State = this.state

    if (!resourceContent) {
      return null
    }

    return (
      <div className={s.ResourceContent}>
        {resourceContent.image && (
          <img
            className={s.ResourceContent__img}
            src={this.getImageUrl(resourceContent.image)}
            alt={resourceContent.title || resourceContent.softTitle}
          />
        )}

        {resourceContent.date && (
          <div className={s.ResourceContent__date}>
            {this.getFormattedDate(resourceContent.date)}
          </div>
        )}

        <div className={s.ResourceContent__text}>
          {resourceContent.text || resourceContent.description}
        </div>
      </div>
    )
  }
}

export default ResourceContent