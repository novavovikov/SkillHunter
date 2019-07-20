import debounce from 'debounce'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { DEBOUNCE_TIMEOUT } from '../../constants/timeout'
import { Button, H2, Input, Tip } from '../../UI'
import { ajax } from '../../utils/ajax'
import Skills from '../Skills'
import * as s from './SkillList.css'

interface Suggestion {
  id?: number,
  name: string
}

interface State {
  inputValue: string
  suggestions: Suggestion[]
  selectedSuggestions: Suggestion[]
}

interface Props extends RouteComponentProps {
  setStep?: (id: string) => void,
  onSubmit: (skills: string[]) => void,
}

class SkillList extends React.Component<Props, State> {
  state = {
    inputValue: '',
    suggestions: [],
    selectedSuggestions: [],
  }

  setSuggestions = (suggestions: Suggestion[]) => {
    this.setState({
      suggestions,
    })
  }

  setSelectedSuggestions = (selectedSuggestions: Suggestion[]) => {
    this.setState({
      selectedSuggestions,
    })
  }

  getSuggestions = debounce((text: string) => {
    ajax.
      get(`/suggests?skill=${text}`).then(({ data }: any) => {
      if (Array.isArray(data)) {
        this.setSuggestions(data)
      }
    })
  }, DEBOUNCE_TIMEOUT)

  setInputValue = (inputValue: string) => {
    this.setState({ inputValue })
  }

  handleInput = (e: any) => {
    const { value } = e.target

    this.getSuggestions(value)
    this.setInputValue(value)
  }

  handleBackBtn = () => {
    const { setStep } = this.props

    if (typeof setStep === 'function') {
      setStep('Skillset')
    }
  }

  handleOnKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      return this.setSelectedSuggestions([
        ...this.state.selectedSuggestions,
        { name: e.target.value },
      ])
    }
  }

  onSubmit = async (e: any) => {
    e.preventDefault()
    const data = this.state.selectedSuggestions.map(({ name }) => name)

    this.props.onSubmit([...new Set(data)])
  }

  render () {
    const {
      inputValue,
      suggestions,
      selectedSuggestions,
    } = this.state

    return (
      <form
        className={s.SkillList}
        onSubmit={this.onSubmit}
      >
        <div className={s.SkillList__caption}>
          <H2 className={s.SkillList__title}>
            Add skills to your skillset
          </H2>
          <Tip icon={'info'}>Скиллсет - это набор компетенций и навыков, которыми обладает специалист.</Tip>
        </div>

        <Input
          className={s.SkillList__input}
          placeholder={'Добавить скилл'}
          value={inputValue}
          onChange={this.handleInput}
          onKeyDown={this.handleOnKeyDown}
          autoFocus
        />

        <Skills
          value={inputValue}
          setSkills={this.setSuggestions}
          setSelectedSkills={this.setSelectedSuggestions}
          skills={suggestions}
          selectedSkills={selectedSuggestions}
        />

        <Button
          className={s.SkillList__button}
          disabled={!selectedSuggestions.length}
          theme="large"
        >
          Submit
        </Button>

        <button
          type={'button'}
          className={s.SkillList__back}
          onClick={this.handleBackBtn}
        >
          Back
        </button>
      </form>
    )
  }
}

export default withRouter(SkillList)

