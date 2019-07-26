import cn from 'classnames'
import React, { PureComponent } from 'react'
import { EResourceStatus } from '../../types'
import * as s from './ResourcePreviewStatus.css'

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
        {status}
      </button>
    )
  }
}

export default ResourcePreviewStatus
