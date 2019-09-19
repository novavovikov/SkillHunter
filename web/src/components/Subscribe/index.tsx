import React, { ChangeEvent, Component, FormEvent } from 'react'
import cn from 'classnames'
import { Button, H4, Input } from '../../UI'
import { withUser } from '../../providers/User'
import { IUser } from '../../types'
import { ajax } from '../../utils/ajax'
import { getErrorData } from '../../utils/error'
import * as s from './Subscribe.css'

interface ISubscribe {
  created: string
  email: string
  feature: string
}

interface Props {
  user: IUser
}

interface State {
  isRequested: boolean
  isInvalidEmail: boolean
  email: string
  subscribe: ISubscribe | null
}

class Subscribe extends Component<Props, State> {
  state = {
    isRequested: false,
    isInvalidEmail: false,
    email: this.props.user.email || '',
    subscribe: null,
  }

  componentDidMount (): void {
    ajax
      .get('subscribe')
      .then(({ data }) => {
        this.setState({
          isRequested: true,
          subscribe: data,
        })
      })
      .catch(err => {
        this.setState({
          isRequested: true,
        })
      })
  }

  changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isInvalidEmail: false,
      email: e.target.value,
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()
    const { email } = this.state

    ajax
      .post('subscribe', {
        email,
        feature: 'plan',
      })
      .then(({ data }) => {
        this.setState({
          subscribe: data,
        })
      })
      .catch((err) => {
        const { message } = getErrorData(err)

        if (message === 'NOT_VALID') {
          this.setState({
            isInvalidEmail: true,
          })
        }
      })
  }

  render () {
    const {
      email,
      isInvalidEmail,
      subscribe,
      isRequested,
    }: State = this.state

    if (!isRequested) {
      return null
    }

    if (subscribe) {
      return (
        <div className={s.Subscribe}>
          <H4 className={s.Subscribe__title}>
            Request has already been sent.
          </H4>

          <p className={s.Subscribe__text}>
            We will send you a letter at {subscribe!.email}  when the feature is released
          </p>
        </div>
      )
    }

    return (
      <form
        className={s.Subscribe}
        onSubmit={this.submitForm}
      >
        <H4 className={s.Subscribe__title}>
          Sign up with your email address to receive news of this feature release.
        </H4>

        <Input
          className={cn(s.Subscribe__field, {
            [s.Subscribe__field_invalid]: isInvalidEmail
          })}
          eventCategory="Subscribe"
          placeholder="Email address"
          value={email}
          onChange={this.changeInput}
          autoFocus
        />

        <Button disabled={!email || isInvalidEmail}>
          Sign Up
        </Button>
      </form>
    )
  }
}

export default withUser(Subscribe)
