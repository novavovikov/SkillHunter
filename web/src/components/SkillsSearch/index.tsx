import { debounce } from 'debounce'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { SuggestionType } from '../../types'
import { Button, Checkbox } from '../../UI'
import { ajax } from '../../utils/ajax'
import { Hash } from '../../utils/hash'
import * as s from './SkillsSearch.css'

interface Props {
  onSubmit: (skills: string[]) => void
  onClose: () => void
  debounce?: number
}

interface State {
  suggestions: SuggestionType[]
  selected: SuggestionType[]
  inputValue: string
}

class SkillsSearch extends Component<Props, State> {
  static defaultProps = {
    debounce: 200,
  }

  state = {
    suggestions: [],
    selected: [],
    inputValue: '',
  }

  handleInput = (e: any) => {
    const value = e.target.value

    this.setState({ inputValue: value })
    this.getSuggestions(value)
  }

  setSuggestions = (suggestions: SuggestionType[]) => {
    this.setState({ suggestions })
  }

  getSuggestions = debounce((text?: string) => {
    ajax.
      get(`/suggests?skill=${text}`).
      then(({ data }) => {
        Array.isArray(data) &&
        this.setSuggestions(data)
      }).
      catch(e => {
        this.setSuggestions([])
      })
  }, this.props.debounce)

  getSkillList = () => {
    const { selected, suggestions, inputValue } = this.state
    const startArr = inputValue ? [{ id: -Hash.generateNumeric(inputValue), name: inputValue }] : []

    return [...selected, ...suggestions].reduce((acc, suggest: SuggestionType) => {
      if (acc.find(({ name }) => name === suggest.name)) {
        return acc
      }

      return [...acc, suggest]
    }, startArr)
  }

  handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { selected } = this.state
    const { value, checked } = e.target
    const checkedId = Number(value)
    const skillList = this.getSkillList()
    const checkedItem = skillList.find(({ id }) => id === checkedId)

    this.setState({
      selected: checked
        ? [...selected, checkedItem as SuggestionType]
        : selected.filter(({ id }) => id !== checkedId),
    })

  }

  selectedAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    this.setState({
      selected: checked
        ? this.getSkillList() as SuggestionType[]
        : [],
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()
    const { onSubmit, onClose } = this.props
    const skills = this.state.selected.map(({ name }) => name)

    onSubmit(skills)
    onClose()
  }

  render () {
    const { selected, inputValue } = this.state
    const { onClose } = this.props

    const skillList = this.getSkillList()

    return (
      <form className={s.SkillsSearch} onSubmit={this.submitForm}>
        <div className={s.SkillsSearch__header}>
          {skillList.length > 0 && (
            <div className={s.SkillsSearch__checkbox}>
              <Checkbox
                checked={skillList.length === selected.length}
                onChange={this.selectedAll}
              >
                All
              </Checkbox>
            </div>
          )}
          <div className={s.SkillsSearch__content}>
            <input
              className={s.SkillsSearch__input}
              type="text"
              placeholder="Type in for search or added new skill"
              value={inputValue}
              onChange={this.handleInput}
              autoFocus
            />
          </div>
        </div>

        <Scrollbar
          autoHeight
          autoHeightMin={250}
          autoHeightMax={250}
          className={s.SkillsSearch__body}
        >
          {skillList.map(({ id, name }: SuggestionType) => (
            <div
              key={id}
              className={s.SkillsSearch__row}
            >
              <div className={s.SkillsSearch__checkbox}>
                <Checkbox
                  value={id}
                  onChange={this.handleCheckbox}
                  checked={!!selected.find((skill: SuggestionType) => skill.id === id)}
                />
              </div>
              <div className={s.SkillsSearch__content}>
                {name}
              </div>
            </div>
          ))}
        </Scrollbar>

        <div className={s.SkillsSearch__footer}>
          <Button
            theme="transparent"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={s.SkillsSearch__submit}
            disabled={!selected.length}
          >
            Choose
          </Button>
        </div>
      </form>
    )
  }
}

export default SkillsSearch
