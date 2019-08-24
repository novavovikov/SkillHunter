import React, { Component } from 'react'
import { IResource } from '../../types'
import favicon from './icons/favicon.svg'
import * as s from './RecommendedResource.css'

interface Props {
  data: IResource
  addResource: (data: any) => void
}

class RecommendedResource extends Component<Props> {
  handleAdd = () => {
    const { addResource, data } = this.props

    addResource(data)
  }

  render () {
    const {
      title,
      link,
      picture,
    } = this.props.data

    const url = new URL(link)

    return (
      <div className={s.RecommendedResource}>
        <button
          className={s.RecommendedResource__add}
          onClick={this.handleAdd}
        />

        <a
          className={s.RecommendedResource__info}
          href={link}
          target="_blank"
        >
          {title || title}

          <div className={s.RecommendedResource__source}>
            <div className={s.RecommendedResource__favicon}>
              <img
                src={picture || favicon}
                alt=""
              />
            </div>
            {url.hostname}
          </div>
        </a>
      </div>
    )
  }
}

export default RecommendedResource
