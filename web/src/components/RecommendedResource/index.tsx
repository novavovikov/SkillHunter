import React, { Component } from 'react'
import { IResource } from '../../types'
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
      author,
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
          {title}

          <div className={s.RecommendedResource__source}>
            <div className={s.RecommendedResource__favicon}>
              <img src={picture} alt=""/>
            </div>

            {url.hostname}
          </div>
        </a>
      </div>
    )
  }
}

export default RecommendedResource
