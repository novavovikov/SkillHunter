import cn from 'classnames'
import React, { Component, FC, InputHTMLAttributes } from 'react'
import { Icon } from '../index'
import * as s from './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameField?: string
}

class Input extends Component<InputProps> {


  render () {
    const { className, classNameField, ...rest } = this.props

    return (
      <label className={cn(s.Input, className)}>
        <input
          className={cn(s.Input__field, classNameField)}
          type={'text'}
          {...rest}
        />

        <button>
          <Icon
            type="remove"
          />
        </button>
      </label>
    )
  }
}

export default Input
