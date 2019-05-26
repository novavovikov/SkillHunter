import * as React from 'react'
import { connect } from 'react-redux'
import { setUserData } from '../../redux/actions/user'
import { AutoComplete, Button, H2 } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './Profession.css'

interface State {
  inputValue: string
}

interface Props {
  setStep?: (id: string) => void,
  setUserData: (data: any) => void
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

  onSubmit = async (e: any) => {
    e.preventDefault()
    const { setStep } = this.props

    if (setStep) {
      await ajax.
        post('user/professions', [this.state.inputValue]).
        then(({ data }) => this.props.setUserData(data))
      await setStep('Skills')
    }
  }

  render () {
    const { inputValue } = this.state

    return (
      <form
        className={s.Profession}
        onSubmit={this.onSubmit}
      >
        <H2>Кто вы сейчас или кем хотите стать?</H2>

        <AutoComplete
          className={s.Profession__input}
          input={{
            value: inputValue,
            onChange: this.setInputValue,
            placeholder: 'Специальность, профессия или должность',
            autoFocus: true,
          }}
        />

        <Button
          disabled={!inputValue}
        >
          Далее
        </Button>
      </form>
    )
  }
}

export default connect(
  null,
  {
    setUserData,
  },
)(Profession)
