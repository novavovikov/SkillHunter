import React, { Component } from 'react'
import cn from 'classnames'
import * as s from './Mark.css'

interface Props {
  color: 'green' | 'blue' | 'orange'
}

class Mark extends Component<Props> {
  static defaultProps = {
    color: 'blue',
  }

  render () {
    const { color, children } = this.props

    return (
      <mark className={cn(s.Mark, {
        [s.Mark_green]: color === 'green',
        [s.Mark_blue]: color === 'blue',
        [s.Mark_orange]: color === 'orange',
      })}>{children}</mark>
    )
  }
}

export default Mark
