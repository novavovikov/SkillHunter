import cn from 'classnames'
import React, { ChangeEvent, Component, createRef, InputHTMLAttributes } from 'react'
import { analytics } from '../../utils/analytics'
import { Icon } from '../index'
import * as s from './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameField?: string
  theme?: 'closed',
  eventCategory?: string
}

class Input extends Component<InputProps> {
  inputRef = createRef<HTMLInputElement>()

  clearField = () => {
    const { onChange, eventCategory } = this.props
    const { current } = this.inputRef

    if (onChange && current) {
      const event = {
        target: { value: '' },
      }

      onChange(event as ChangeEvent<HTMLInputElement>)

      analytics({
        event: 'click_reset',
        category: eventCategory
      })

      current.focus()
    }
  }

  render () {
    const {
      className,
      classNameField,
      theme,
      value,
      disabled,
      ...rest
    } = this.props

    return (
      <label className={cn(s.Input, className)}>
        <input
          className={cn(
            s.Input__field,
            {
              [s.Input__field_closed]: theme === 'closed'
            },
            classNameField,
          )}
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
              size="18"
            />
          </button>
        )}
      </label>
    )
  }
}

export default Input
