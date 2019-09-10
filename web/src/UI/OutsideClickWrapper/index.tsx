import React, { Component, createRef } from 'react'

interface Props {
  handler: (e: MouseEvent | TouchEvent) => void
  disabled: boolean
  className?: string
}

class OutsideClickWrapper extends Component<Props> {
  static defaultProps = {
    disabled: false
  }

  wrapperRef = createRef<HTMLDivElement>()

  componentDidMount (): void {
    if ('ontouchstart' in window) {
      document.body.addEventListener('touchend', this.outsideHandler)
    } else {
      document.body.addEventListener('mouseup', this.outsideHandler)
    }
  }

  componentWillUnmount (): void {
    if ('ontouchend' in window) {
      document.body.removeEventListener('touchend', this.outsideHandler)
    } else {
      document.body.removeEventListener('mouseup', this.outsideHandler)
    }
  }

  outsideHandler = (e: MouseEvent | TouchEvent) => {
    const { handler, disabled } = this.props
    const { current: wrapperNode } = this.wrapperRef
    const isContainNode = wrapperNode && wrapperNode.contains(e.target as any)

    if (!isContainNode && !disabled) {
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
