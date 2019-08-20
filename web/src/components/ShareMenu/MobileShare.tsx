import cn from 'classnames'
import React, { Component } from 'react'
import { IconTypes } from '../../types'
import { Icon } from '../../UI'
import * as s from '../../UI/Menu/Menu.css'
import { urlNormalizer } from '../../utils/url'
import { ShareProps } from './index'

class MobileShare extends Component<ShareProps> {
  handleMenu = () => {
    const { link, text } = this.props
    const url = urlNormalizer(`${window.location.origin}${link}`)

    navigator.share({
      title: text,
      url
    })
  }

  render () {
    const { label } = this.props

    return (
      <button
        className={cn(s.Menu__button, s.Menu__button_withLabel)}
        onClick={this.handleMenu}
      >
        <Icon
          type={IconTypes.share}
          size="18"
        />
        {label && <span className={cn(s.Menu__label)}>{label} </span>}
      </button>
    )
  }
}

export default MobileShare
