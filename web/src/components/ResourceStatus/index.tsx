import cn from 'classnames'
import React, { FC, PureComponent } from 'react'
import { ResourceStatusTypes } from '../../types'
import * as s from './ResourceStatus.css'

interface Props {
  isOpen?: boolean
  status: ResourceStatusTypes | string
}

class ResourceStatus extends PureComponent<Props> {
  render () {
    const { status, isOpen } = this.props

    return (
      <div
        className={cn(
          s.ResourceStatus,
          {
            [s.ResourceStatus_opened]: isOpen,
          },
        )}
      >
        {status}
      </div>
    )
  }
}

export default ResourceStatus
