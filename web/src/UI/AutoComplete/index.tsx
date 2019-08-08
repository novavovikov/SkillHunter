import cn from 'classnames'
import { debounce } from 'debounce'
import React, { ChangeEvent } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { ISuggestion } from '../../types'
import { ajax } from '../../utils/ajax'
import { OutsideClickWrapper } from '../index'
import Input, { InputProps } from '../Input'
import * as s from './AutoComplete.css'

interface Props {
  className?: string
  input: InputProps
  debounce?: number
}

interface State {
  suggestions: ISuggestion[]
}

class AutoComplete extends React.Component<Props, State> {
  static defaultProps = {
    debounce: 200,
  }

  state = {
    suggestions: [],
  }

  setSuggestions = (suggestions: ISuggestion[]) => {
    this.setState({ suggestions })
  }

  deleteSuggestions = () => {
    this.setSuggestions([])
  }

  getSuggestions = debounce((text?: string) => {
    ajax.
      get(`/suggests?skillset=${text}`).
      then(({ data }: any) => {
        Array.isArray(data) &&
        this.setSuggestions(data)
      }).
      catch(e => {
        this.deleteSuggestions()
      })
  }, this.props.debounce)

  handleSuggestion = (e: any) => {
    const { input } = this.props

    this.deleteSuggestions()

    if (typeof input.onChange === 'function') {
      input.onChange(e as ChangeEvent<HTMLInputElement>)
    }
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const { input } = this.props

    this.getSuggestions(value)

    if (typeof input.onChange === 'function') {
      input.onChange(e as ChangeEvent<HTMLInputElement>)
    }
  }

  onFocusInput = (e: any) => {
    const { input } = this.props

    if (input.value) {
      this.getSuggestions(input.value as string)
    }

    if (typeof input.onFocus === 'function') {
      input.onFocus(e)
    }
  }

  getSuggestionsList = () => {
    const { input } = this.props
    const { suggestions } = this.state

    const startArr = input.value && suggestions.length
      ? [{ id: '-1', name: input.value }]
      : []

    return suggestions.reduce((acc, suggestion: ISuggestion) => {
      if (acc.some(({ name }: ISuggestion) => name.toLowerCase() === suggestion.name.toLowerCase())) {
        return acc
      }

      return [...acc, suggestion]
    }, startArr)
  }

  render () {
    const { input, className } = this.props
    const suggestions = this.getSuggestionsList()

    return (
      <OutsideClickWrapper
        className={cn(s.AutoComplete, className)}
        handler={this.deleteSuggestions}
      >
        <Input
          {...input}
          theme="closed"
          onFocus={this.onFocusInput}
          onChange={this.handleInput}
        />

        {suggestions.length > 0 && (
          <div className={s.AutoComplete__list}>
            <Scrollbar
              autoHeight
              autoHeightMax={300}
            >
              {suggestions.map(({ id, name }) => (
                <button
                  key={id}
                  type={'button'}
                  className={s.AutoComplete__item}
                  onClick={this.handleSuggestion}
                  value={name}
                >
                  {name}
                </button>
              ))}
            </Scrollbar>
          </div>
        )}
      </OutsideClickWrapper>
    )
  }
}

export default AutoComplete
