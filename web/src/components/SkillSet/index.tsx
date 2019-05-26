import * as React from 'react'
import debounce from 'debounce'
import { RouteComponentProps, withRouter } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { DEBOUNCE_TIMEOUT } from '../../constants/timeout'
import { Button, H2, Input, Tip } from '../../UI'
import { ajax } from '../../utils/ajax'
import Skills from '../Skills'
import * as s from './SkillSet.css'

interface Suggesion {
  id?: number,
  name: string
}

interface State {
  inputValue: string
  suggestions: Suggesion[]
  selectedSuggestions: Suggesion[]
}

interface Props extends RouteComponentProps {
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
      setStep('Profession')
    }
  }

  handleOnKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      return this.setSelectedSuggestions([
        ...this.state.selectedSuggestions,
        { name: e.target.value }
      ])
    }
  }

  onSubmit = async (e: any) => {
    e.preventDefault()
    const data = this.state.selectedSuggestions.map(({ name }) => name)

    await ajax.
      post('user/skills', data).
      then(resp => {
        this.props.history.push(ROUTES.HOME)
      })
      .catch(err => {
        console.warn('Skills', err)
      })
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
          <Tip icon={'info'}>Скиллсет - это набор компетенций и навыков, которыми обладает специалист.</Tip>
        </div>

        <Input
          className={s.SkillSet__input}
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
          className={s.SkillSet__button}
          disabled={!selectedSuggestions.length}
        >
          Далее
        </Button>

        <button
          type={'button'}
          className={s.SkillSet__back}
          onClick={this.handleBackBtn}
        >
          Назад
        </button>
      </form>
    )
  }
}

export default withRouter(SkillSet)
