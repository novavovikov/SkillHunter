import React from 'react'
import { AutoComplete, Button, H2 } from '../../UI'
import * as s from './SkillsetStep.css'

interface State {
  inputValue: string
}

interface Props {
  setStep?: (id: string) => void,
  onSubmit: (skillset: string) => void
}

class SkillsetStep extends React.Component<Props, State> {
  state = {
    inputValue: '',
  }

  setInputValue = (e: any) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    const { setStep, onSubmit } = this.props

    if (setStep) {
      onSubmit(this.state.inputValue)
      setStep('Skills')
    }
  }

  render () {
    const { inputValue } = this.state

    return (
      <form
        className={s.SkillsetStep}
        onSubmit={this.onSubmit}
      >
        <H2 className={s.SkillsetStep__title}>
          Create your skillset and improve it
        </H2>

        <AutoComplete
          className={s.SkillsetStep__input}
          input={{
            value: inputValue,
            onChange: this.setInputValue,
            placeholder: 'Enter your skillset (speciality, profession or hobby)',
            autoFocus: true,
            eventCategory: 'introduction_1'
          }}
        />

        <Button
          disabled={!inputValue}
          theme="large"
        >
          Improve
          <span className={s.SkillsetStep__label}>
            your skills
          </span>
        </Button>
      </form>
    )
  }
}

export default SkillsetStep