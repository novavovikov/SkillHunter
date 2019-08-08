import cn from 'classnames'
import { debounce } from 'debounce'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { ISuggestion } from '../../types'
import { Button, Checkbox, Input } from '../../UI'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import { Hash } from '../../utils/hash'
import * as s from './SkillsSearch.css'

interface Props {
  theme?: 'step'
  eventCategory: string
  onSubmit: (skills: string[]) => void
  onCancel: () => void
  debounce?: number
}

interface State {
  suggestions: ISuggestion[]
  selected: ISuggestion[]
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

  setSuggestions = (suggestions: ISuggestion[]) => {
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
    const value = inputValue.trim()

    const startArr = value ? [{ id: -Hash.generateNumeric(value), name: value }] : []

    return [...suggestions, ...selected].reduce((acc, suggest: ISuggestion) => {
      if (acc.find(({ name }) => name === suggest.name)) {
        return acc
      }

      return [...acc, suggest]
    }, startArr)
  }

  handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { eventCategory } = this.props
    const { selected } = this.state
    const { value, checked } = e.target
    const checkedId = Number(value)
    const skillList = this.getSkillList()
    const checkedItem = skillList.find(({ id }) => id === checkedId)

    this.setState({
      selected: checked
        ? [...selected, checkedItem as ISuggestion]
        : selected.filter(({ id }) => id !== checkedId),
    })

    if (checked) {
      analytics({
        event: 'click_checkbox_skill',
        input_skill: checkedItem && checkedItem.name,
        category: eventCategory
      })
    }
  }

  selectedAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    this.setState({
      selected: checked
        ? this.getSkillList() as ISuggestion[]
        : [],
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()
    const { onSubmit, theme, eventCategory } = this.props
    const skills = this.state.selected.map(({ name }) => name)

    onSubmit(skills)

    analytics({
      event: theme === 'step' ? 'click_next' : 'click_choose',
      category: eventCategory
    })

    for (const skill of skills) {
      analytics({
        event: 'skill_added',
        skill_name: skill,
        category: eventCategory
      })
    }
  }

  onCancel = () => {
    const { onCancel, theme, eventCategory } = this.props

    onCancel()

    analytics({
      event: theme === 'step' ? 'click_back' : 'click_cancel',
      category: eventCategory
    })
  }

  render () {
    const { selected, inputValue } = this.state
    const { theme, eventCategory } = this.props

    const skillList = this.getSkillList()

    return (
      <form
        className={cn(s.SkillsSearch)}
        onSubmit={this.submitForm}
      >
        <div className={s.SkillsSearch__header}>
          <div className={s.SkillsSearch__field}>
            {skillList.length > 0 && (
              <div className={cn(s.SkillsSearch__checkbox, s.SkillsSearch__checkbox_header)}>
                <Checkbox
                  checked={skillList.length === selected.length}
                  onChange={this.selectedAll}
                >
                  All
                </Checkbox>
              </div>
            )}
            <div className={s.SkillsSearch__content}>
              <Input
                classNameField={cn({
                  [s.SkillsSearch__input]: skillList.length
                })}
                type="text"
                placeholder="Type in for search or added new skill"
                value={inputValue}
                onChange={this.handleInput}
                eventCategory={eventCategory}
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className={s.SkillsSearch__body}>
          <Scrollbar
            autoHeight
            autoHide
            autoHeightMin={250}
            autoHeightMax={250}
          >
            {skillList.map(({ id, name }: ISuggestion) => (
              <div
                key={id}
                className={s.SkillsSearch__row}
              >
                <div className={s.SkillsSearch__checkbox}>
                  <Checkbox
                    value={id}
                    onChange={this.handleCheckbox}
                    checked={!!selected.find((skill: ISuggestion) => skill.id === id)}
                  />
                </div>
                <div className={s.SkillsSearch__content}>
                  {name}
                </div>
              </div>
            ))}
          </Scrollbar>
        </div>

        <div className={cn(s.SkillsSearch__footer, {
          [s.SkillsSearch__footer_step]: theme === 'step',
        })}>
          <Button
            theme="transparent"
            type="button"
            onClick={this.onCancel}
            className={s.SkillsSearch__btn}
          >
            {theme === 'step'
              ? 'Back'
              : 'Cancel'
            }
          </Button>
          <Button
            className={s.SkillsSearch__btn}
            disabled={!selected.length}
          >
            {theme === 'step'
              ? 'Next'
              : 'Choose'
            }
          </Button>
        </div>
      </form>
    )
  }
}

export default SkillsSearch
