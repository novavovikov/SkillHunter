import React, { ChangeEvent, Component, FormEvent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { ajax } from '../../utils/ajax'
import { Button, Popup, Input } from '../../UI'
import * as s from './RemoveAccount.css'

interface State {
  isOpen: boolean
  inputValue: string
}

class RemoveAccount extends Component<RouteComponentProps, State> {
  state = {
    isOpen: false,
    inputValue: ''
  }

  openRemovePopup = () => {
    this.setState({
      isOpen: true,
    })
  }

  closeRemovePopup = () => {
    this.setState({
      isOpen: false,
      inputValue: ''
    })
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { inputValue } = this.state
    const { history } = this.props

    if (inputValue.toLowerCase().trim() === 'yes') {
      await ajax.delete('user')
      return history.push(ROUTES.LOGOUT)
    }

    this.closeRemovePopup()
  }

  render () {
    const { isOpen, inputValue } = this.state

    return (
      <div className={s.RemoveAccount}>
        <Button onClick={this.openRemovePopup}>
          Remove account?
        </Button>

        <Popup
          isOpen={isOpen}
          onClose={this.closeRemovePopup}
        >
          <form className={s.RemoveAccount__form} onSubmit={this.onSubmit}>
            <div className={s.RemoveAccount__title}>
              Are you sure you want to do this?
            </div>
            <div className={s.RemoveAccount__text}>
              If you want to do this then enter "Yes".
            </div>

            <Input
              className={s.RemoveAccount__input}
              value={inputValue}
              onChange={this.handleInput}
              placeholder="Yes or No"
              eventCategory="profile"
              autoFocus
            />

            <Button
              className={s.RemoveAccount__submit}
              disabled={!inputValue}
            >
              Remove account?
            </Button>

            <Button
              type="button"
              theme="transparent"
              onClick={this.closeRemovePopup}
            >
              Cancel
            </Button>
          </form>
        </Popup>
      </div>
    )
  }
}

export default withRouter(RemoveAccount)
