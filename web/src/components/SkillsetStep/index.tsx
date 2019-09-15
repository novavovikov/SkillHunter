import React, { ChangeEvent, Component } from 'react'
import { AutoComplete, Button, H2 } from '../../UI'
import * as s from './SkillsetStep.css'

interface Props {
  skillset: string
  onChange: (skillset: string) => void
  setStep?: (id: string) => void
  onSubmit: () => void
}

class SkillsetStep extends Component<Props> {
  setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props
    const { value } = e.target

    onChange(value)
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    const { setStep, onSubmit } = this.props

    if (setStep) {
      onSubmit()
      setStep('Skills')
    }
  }

  render () {
    const { skillset } = this.props

    return (
      <form
        className={s.SkillsetStep}
        onSubmit={this.onSubmit}
      >
        <H2 className={s.SkillsetStep__title}>
          Create your skillset and improve it!
        </H2>

        <AutoComplete
          className={s.SkillsetStep__input}
          input={{
            value: skillset,
            onChange: this.setInputValue,
            placeholder: 'Enter your skillset (speciality, profession or hobby)',
            autoFocus: true,
            eventCategory: 'introduction_1'
          }}
        />

        <Button
          disabled={!skillset}
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
