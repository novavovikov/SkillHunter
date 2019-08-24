import React, { Component } from 'react'
import { IResource, IUserResource } from '../../types'
import { RecommendedResource } from '../index'
import * as s from './RecommendedResources.css'

interface Props {
  data: IResource[]
  addResource: (data: Partial<IUserResource>) => void
}

class RecommendedResources extends Component<Props> {
  render () {
    const {
      data,
      addResource,
    } = this.props

    return (
      <div className={s.RecommendedResources}>
        <h5 className={s.RecommendedResources__title}>
          Recommended
        </h5>

        {data.map(item => (
          <RecommendedResource
            key={item.id}
            data={item}
            addResource={addResource}
          />
        ))}
      </div>
    )
  }
}

export default RecommendedResources
