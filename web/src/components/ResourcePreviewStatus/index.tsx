import cn from 'classnames'
import React, { PureComponent } from 'react'
import { EResourceStatus } from '../../types'
import * as s from './ResourcePreviewStatus.css'
import { RESOURCE_STATUS_NAMES } from '../../constants/status'

interface Props {
  isOpen?: boolean
  className?: string
  status: EResourceStatus | string
}

class ResourcePreviewStatus extends PureComponent<Props> {
  render () {
    const { status, className, isOpen } = this.props

    return (
      <button
        className={cn(s.ResourcePreviewStatus, className, {
            [s.ResourcePreviewStatus_opened]: isOpen,
          },
        )}
      >
        {RESOURCE_STATUS_NAMES[status]}
      </button>
    )
  }
}

export default ResourcePreviewStatus
