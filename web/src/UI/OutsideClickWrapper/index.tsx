import React, { Component, createRef } from 'react'

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
    document.body.addEventListener('click', this.outsideHandler)
  }

  componentWillUnmount (): void {
    document.body.removeEventListener('click', this.outsideHandler)
  }

  outsideHandler = (e: MouseEvent) => {
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
