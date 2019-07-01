import { debounce } from 'debounce'
import React, { Component } from 'react'
import { SuggestionType } from '../../types'
import { Button, Checkbox } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './SkillsSearch.css'

interface Props {
  onClose: () => void
  debounce?: number
}

interface State {
  suggestions: SuggestionType[]
}

class SkillsSearch extends Component<Props, State> {
  static defaultProps = {
    debounce: 200,
  }

  state = {
    suggestions: [],
  }

  handleInput = (e: any) => {
    const value = e.target.value

    this.getSuggestions(value)
  }

  setSuggestions = (suggestions: SuggestionType[]) => {
    this.setState({ suggestions })
  }

  getSuggestions = debounce((text?: string) => {
    ajax.
      get(`/suggests?skillset=${text}`).
      then(({ data }: any) => {
        Array.isArray(data) &&
        this.setSuggestions(data)
      }).
      catch(e => {
        this.setSuggestions([])
      })
  }, this.props.debounce)

  render () {
    const { onClose } = this.props

    return (
      <div className={s.SkillsSearch}>
        <div className={s.SkillsSearch__header}>
          <div className={s.SkillsSearch__checkbox}>
            <Checkbox>
              All
            </Checkbox>
          </div>
          <div className={s.SkillsSearch__content}>
            <input
              className={s.SkillsSearch__input}
              type="text"
              placeholder="Type in for search or added new skill"
              onChange={this.handleInput}
            />
          </div>
        </div>

        <div className={s.SkillsSearch__footer}>
          <Button
            theme="transparent"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className={s.SkillsSearch__submit}>
            Choose
          </Button>
        </div>
      </div>
    )
  }
}

export default SkillsSearch
