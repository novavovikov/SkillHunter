import cn from 'classnames'
import * as React from 'react'
import withClickOutside from 'react-click-outside'
import Scrollbar from 'react-custom-scrollbars'
import { ajax } from '../../utils/ajax'
import Input, { InputProps } from '../Input'
import * as s from './AutoComplete.css'

interface Suggestion {
  id: string,
  text: string
}

interface Props {
  className?: string
  input: InputProps
}

interface State {
  suggestions: Suggestion[]
}

class AutoComplete extends React.Component<Props, State> {
  state = {
    suggestions: [],
  }

  handleClickOutside () {
    this.setSuggestions([])
  }

  setSuggestions = (suggestions: Suggestion[]) => {
    this.setState({ suggestions })
  }

  getSuggestions = (text?: string) => {
    ajax.
      get(`/suggests?profession=${text}`).then(({ data }: any) => {
      Array.isArray(data.items) &&
      this.setSuggestions(data.items)
    })
  }

  handleSuggestion = (e: any) => {
    this.props.input.onChange(e)
    this.setSuggestions([])
  }

  handleInput = (e: any) => {
    const value = e.target.value

    this.getSuggestions(value)
    this.props.input.onChange(e)
  }

  onFocusInput = (e: any) => {
    const { input } = this.props

    this.getSuggestions(input.value)
    input.onFocus && input.onFocus(e)
  }

  render () {
    const { input, className } = this.props
    const { suggestions } = this.state

    return (
      <div className={cn(s.AutoComplete, className)}>
        <Input
          {...input}
          onFocus={this.onFocusInput}
          onChange={this.handleInput}
        />

        {suggestions.length > 0 && (
          <div className={s.AutoComplete__list}>
            <Scrollbar
              autoHeight
              autoHeightMax={300}
            >
              {suggestions.map(({ id, text }) => (
                <button
                  key={id}
                  type={'button'}
                  className={s.AutoComplete__item}
                  onClick={this.handleSuggestion}
                  value={text}
                >
                  {text}
                </button>
              ))}
            </Scrollbar>
          </div>
        )}
      </div>
    )
  }
}

export default withClickOutside(AutoComplete)
