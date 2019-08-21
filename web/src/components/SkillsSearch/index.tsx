import cn from 'classnames'
import { debounce } from 'debounce'
import React, { ChangeEvent, Component, FormEvent } from 'react'
import { ISuggestion } from '../../types'
import { Button, Checkbox, Input } from '../../UI'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import { Hash } from '../../utils/hash'
import { SkillSearchList } from '../index'
import { SkillsSuggestionProps } from '../SkillsSuggestion'
import * as s from './SkillsSearch.css'

interface Props extends SkillsSuggestionProps{
  debounce?: number
}

interface State {
  recommendedSkills: ISuggestion[]
  suggestions: ISuggestion[]
  selectedSkills: ISuggestion[]
  inputValue: string
}

class SkillsSearch extends Component<Props, State> {
  static defaultProps = {
    debounce: 200,
  }

  state = {
    recommendedSkills: [],
    suggestions: [],
    selectedSkills: [],
    inputValue: '',
  }

  componentDidMount (): void {
    const { skillset } = this.props

    ajax.
      get(`skillset/recommendation/skills/${skillset}`).
      then(({ data }) => {
        this.setState({
          recommendedSkills: data,
        })
      })
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

  getSuggestedSkill = () => {
    const {
      selectedSkills,
      suggestions,
      recommendedSkills,
      inputValue,
    } = this.state

    const value = inputValue.trim()
    const startArr = value ? [{ id: -Hash.generateNumeric(value), name: value }] : []

    return [...suggestions, ...selectedSkills].reduce((acc, suggest: ISuggestion) => {
      const recommendedItem = recommendedSkills.find(({ name }) => name === suggest.name)

      if (
        recommendedItem ||
        acc.find(({ name }) => name === suggest.name)
      ) {
        return acc
      }

      return [...acc, suggest]
    }, startArr)
  }

  handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { eventCategory } = this.props
    const { selectedSkills, recommendedSkills } = this.state
    const { value, checked } = e.target

    const checkedId = Number(value)
    const suggestedSkills = this.getSuggestedSkill()
    const checkedItem = suggestedSkills.find(({ id }) => id === checkedId) ||
      recommendedSkills.find(({ id }) => id === checkedId)

    this.setState({
      selectedSkills: checked
        ? [...selectedSkills, checkedItem as ISuggestion]
        : selectedSkills.filter(({ id }) => id !== checkedId),
    })

    if (checked) {
      analytics({
        event: 'click_checkbox_skill',
        input_skill: checkedItem && checkedItem.name,
        category: eventCategory
      })
    }
  }

  selectedSkillsAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { recommendedSkills } = this.state
    const { checked } = e.target

    this.setState({
      selectedSkills: checked
        ? [...this.getSuggestedSkill() as ISuggestion[], ...recommendedSkills]
        : [],
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()
    const { onSubmit, theme, eventCategory } = this.props
    const skills = this.state.selectedSkills.map(({ name }) => name)

    onSubmit(skills)

    analytics({
      event: theme === 'step' ? 'click_next' : 'click_choose',
      category: eventCategory
    })

    analytics({
      event: 'skill_added',
      skill_name: skills,
      category: eventCategory,
    })
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
    const { selectedSkills, inputValue, recommendedSkills } = this.state
    const { theme, eventCategory } = this.props

    const suggestedSkills = this.getSuggestedSkill() as ISuggestion[]
    const skillsCount = suggestedSkills.length + recommendedSkills.length

    return (
      <form
        className={cn(s.SkillsSearch)}
        onSubmit={this.submitForm}
      >
        <div className={s.SkillsSearch__header}>
          <div className={s.SkillsSearch__field}>
            {skillsCount > 0 && (
              <div className={s.SkillsSearch__checkbox}>
                <Checkbox
                  checked={skillsCount === selectedSkills.length}
                  onChange={this.selectedSkillsAll}
                >
                  All
                </Checkbox>
              </div>
            )}
            <div className={s.SkillsSearch__content}>
              <Input
                classNameField={cn({
                  [s.SkillsSearch__input]: skillsCount > 0,
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
          <SkillSearchList
            title="Add as new skill"
            skills={suggestedSkills}
            selectedSkills={selectedSkills}
            onChange={this.handleCheckbox}
          />

          <SkillSearchList
            title="Recommended"
            skills={recommendedSkills}
            selectedSkills={selectedSkills}
            onChange={this.handleCheckbox}
          />
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
            disabled={!selectedSkills.length}
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
