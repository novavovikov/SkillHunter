import axios from 'axios'
import React, { Component } from 'react'
import Input from '../Input'
import Button from '../Button'
import { APP_ROUTE } from '../../constants/routes'
import { analytics } from './utils/analytics'
import s from './SkillsetForm.scss'

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
    const { inputValue } = this.state

    axios.post('/api/auth/registration', {
      skillset: inputValue
    })

    analytics({
      event: 'click_improve_btn',
      input_skillset: inputValue,
      category: 'landing'
    })

    window.location.href = APP_ROUTE
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
