import React, { ChangeEvent, Component, FormEvent } from 'react'
import { AutoComplete, Button } from '../../UI'
import { analytics } from '../../utils/analytics'
import { ROUTES } from '../../constants/routing'
import { ajax } from '../../utils/ajax'
import s from './SkillsetForm.css'
import { API } from '../../constants/api'

class SkillsetForm extends Component {
  state = {
    inputValue: '',
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()
    const { inputValue } = this.state

    ajax.post(API.AUTH_REGISTRATION, {
      skillset: inputValue,
    })

    analytics({
      event: 'click_improve_btn',
      input_skillset: inputValue,
      category: 'landing',
    })

    window.location.href = ROUTES.APP
  }

  render () {
    const { inputValue } = this.state

    return (
      <form
        className={s.SkillsetForm}
        onSubmit={this.submitForm}
      >

        <AutoComplete
          className={s.SkillsetForm__input}
          input={{
            value: inputValue,
            onChange: this.onChangeInput,
            placeholder: 'Enter your skillset (speciality, profession or hobby)',
            autoFocus: true,
            eventCategory: 'landing',
          }}
        />

        <div className={s.SkillsetForm__footer}>
          <Button
            theme="large"
            disabled={!inputValue}
          >
            Improve
            <span className={s.SkillsetForm__label}>
              your skills
              </span>
          </Button>
        </div>
      </form>
    )
  }
}

export default SkillsetForm
