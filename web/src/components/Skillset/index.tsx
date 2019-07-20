import React from 'react'
import { AutoComplete, Button, H2 } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './Skillset.css'

interface State {
  inputValue: string
}

interface Props {
  setStep?: (id: string) => void,
  onSubmit: (skillset: string) => void
}

class Skillset extends React.Component<Props, State> {
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
      ajax.post('skillset', {
        skillsets: [{
          name: this.state.inputValue
        }]
      })
      onSubmit(this.state.inputValue)
      setStep('Skills')
    }
  }

  render () {
    const { inputValue } = this.state

    return (
      <form
        className={s.Skillset}
        onSubmit={this.onSubmit}
      >
        <H2 className={s.Skillset__title}>
          Create your skillset and improve it
        </H2>

        <AutoComplete
          className={s.Skillset__input}
          input={{
            value: inputValue,
            onChange: this.setInputValue,
            placeholder: 'Enter your skillset (speciality, profession or hobby)',
            autoFocus: true,
          }}
        />

        <Button
          disabled={!inputValue}
          theme="large"
        >
          Improve
          <span className={s.Skillset__label}>
            your skills
          </span>
        </Button>
      </form>
    )
  }
}

export default Skillset
