import React, { Component, createRef } from 'react'
import { getClosestNode } from '../../utils/closest'

interface Props {
  handler: (e: MouseEvent) => void
  disabled: boolean
  className?: string
}

class OutsideClickWrapper extends Component<Props> {
  static defaultProps = {
    disabled: false
  }

  wrapperRef = createRef<HTMLDivElement>()

  componentDidMount (): void {
    window.addEventListener('click', this.outsideHandler)
  }

  componentWillUnmount (): void {
    window.removeEventListener('click', this.outsideHandler)
  }

  outsideHandler = (e: MouseEvent) => {
    const { handler, disabled } = this.props
    const closestNode = getClosestNode(e.target, this.wrapperRef.current)

    if (!closestNode && !disabled) {
      handler(e)
    }
  }

  render () {
    const { children, className } = this.props

    return (
      <div
        className={className}
        ref={this.wrapperRef}
      >
        {children}
      </div>
    )
  }
}

export default OutsideClickWrapper
