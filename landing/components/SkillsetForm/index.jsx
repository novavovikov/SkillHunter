import React, { Component } from 'react'
import Input from '../Input'
import Button from '../Button'
import { APP_ROUTE } from '../../constants/routes'
import s from './SkillsetForm.scss'
import { analytics } from './utils/analytics'

class SkillsetForm extends Component {
  state = {
    inputValue: ''
  }

  onChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    window.location.href = APP_ROUTE

    analytics({
      event: 'landing_submit_form_skillset'
    })
  }

  render () {
    const { inputValue } = this.state

    return (
      <form onSubmit={this.submitForm}>
        <Input
          className={s.SkillsetForm__input}
          placeholder="Enter your skillset (speciality, profession or hobby)"
          value={inputValue}
          onChange={this.onChangeInput}
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
