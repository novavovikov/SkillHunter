import React from 'react'
import { AutoComplete, Button, H2 } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './Profession.css'

interface State {
  inputValue: string
}

interface Props {
  setStep?: (id: string) => void,
  onSubmit: (profession: string) => void
}

class Profession extends React.Component<Props, State> {
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
      ajax.post('profession', {
        professions: [{
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
        className={s.Profession}
        onSubmit={this.onSubmit}
      >
        <H2>Who are you now or who do you want to become?</H2>

        <AutoComplete
          className={s.Profession__input}
          input={{
            value: inputValue,
            onChange: this.setInputValue,
            placeholder: 'Specialty, profession or position',
            autoFocus: true,
          }}
        />

        <Button
          disabled={!inputValue}
          theme="large"
        >
          Next
        </Button>
      </form>
    )
  }
}

export default Profession
