import cn from 'classnames'
import React, { ChangeEvent, Component, createRef, InputHTMLAttributes } from 'react'
import { Icon } from '../index'
import * as s from './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameField?: string
}

class Input extends Component<InputProps> {
  inputRef = createRef<HTMLInputElement>()

  clearField = () => {
    const { onChange } = this.props
    const { current } = this.inputRef

    if (onChange && current) {
      const event = {
        target: { value: '' },
      }

      onChange(event as ChangeEvent<HTMLInputElement>)
      current.focus()
    }
  }

  render () {
    const {
      className,
      classNameField,
      value,
      disabled,
      ...rest
    } = this.props

    return (
      <label className={cn(s.Input, className)}>
        <input
          className={cn(s.Input__field, classNameField)}
          ref={this.inputRef}
          type={'text'}
          value={value}
          disabled={disabled}
          {...rest}
        />

        {value && !disabled && (
          <button
            className={s.Input__clear}
            onClick={this.clearField}
            type="button"
          >
            <Icon
              type="remove"
              size="lg"
            />
          </button>
        )}
      </label>
    )
  }
}

export default Input
