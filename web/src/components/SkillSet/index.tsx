import * as React from 'react'
import { Button, H2, Input, Tip } from '../../UI'
import { ajax } from '../../utils/ajax'
import Skills from '../Skills'
import * as s from './SkillSet.css'

interface Suggesion {
  id: number,
  text: string
}

interface State {
  inputValue: string
  suggestions: Suggesion[]
  selectedSuggestions: Suggesion[]
}

interface Props {
  setStep?: (id: string) => void
}

class SkillSet extends React.Component<Props, State> {
  state = {
    inputValue: '',
    suggestions: [],
    selectedSuggestions: [],
  }

  setSuggestions = (suggestions: Suggesion[]) => {
    this.setState({
      suggestions,
    })
  }

  setSelectedSuggestions = (selectedSuggestions: Suggesion[]) => {
    this.setState({
      selectedSuggestions,
    })
  }

  getSuggesions = (text: string) => {
    ajax.
      get(`/suggests?skill=${text}`).then(({ data }: any) => {
      if (Array.isArray(data.items)) {
        this.setSuggestions(data.items)
      }
    })
  }

  setInputValue = (inputValue: string) => {
    this.setState({ inputValue })
  }

  handleInput = (e: any) => {
    const { value } = e.target

    this.getSuggesions(value)
    this.setInputValue(value)
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    const {
      setStep,
    } = this.props

    if (typeof setStep === 'function') {
      setStep('Profession')
    }
  }

  render () {
    const {
      inputValue,
      suggestions,
      selectedSuggestions,
    } = this.state

    return (
      <form
        className={s.SkillSet}
        onSubmit={this.onSubmit}
      >
        <div className={s.SkillSet__caption}>
          <H2 className={s.SkillSet__title}>Создайте скиллсет</H2>
          <Tip>Скиллсет - это набор компетенций и навыков, которыми обладает специалист.</Tip>
        </div>

        <Input
          className={s.SkillSet__input}
          placeholder={'Добавить скилл'}
          value={inputValue}
          onChange={this.handleInput}
          autoFocus
        />

        <Skills
          setSkills={this.setSuggestions}
          setSelectedSkills={this.setSelectedSuggestions}
          skills={suggestions}
          selectedSkills={selectedSuggestions}
        />

        <Button
          className={s.SkillSet__button}
          disabled={!selectedSuggestions.length}
        >
          Далее
        </Button>
      </form>
    )
  }
}

export default SkillSet
