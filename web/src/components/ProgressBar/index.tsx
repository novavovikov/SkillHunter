import React, { Component } from 'react'
import cn from 'classnames'
import s from './ProgressBar.css'

interface State {
  active: boolean
}

class ProgressBar extends Component<{}, State> {
  state = {
    active: false
  }

  componentDidMount (): void {
  }

  render () {
    const { active } = this.state

    if (!active) {
      return null
    }

    return (
      <div className={cn(s.ProgressBar, {
        [s.ProgressBar_active]: active
      })}/>
    )
  }
}

export default ProgressBar
