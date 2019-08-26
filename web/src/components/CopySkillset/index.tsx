import React, { ChangeEvent, Component, FormEvent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { withUser } from '../../providers/User'
import { copyUserSkillsetSaga } from '../../redux/actions/user'
import { ISkillset } from '../../types'
import { Input, Popup, SimpleButton } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './CopySkillset.css'

interface Props {
  isOpen: boolean
  source: ISkillset
  copyUserSkillset: (source: string, target: string) => void
  onClose: () => void
}

interface State {
  inputValue: string
}

class CopySkillset extends Component<Props, State> {
  state = {
    inputValue: ''
  }

  closePopup = () => {
    const { onClose } = this.props

    onClose()
    this.setState({
      inputValue: ''
    })
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  submitForm = (e: FormEvent) => {
    e.preventDefault()

    const { inputValue } = this.state
    const { copyUserSkillset, onClose, source } = this.props

    copyUserSkillset(source.name, inputValue.trim())
    this.closePopup()

    analytics({
      event: 'click_copy_skillset',
      category: 'skillset',
    })
  }

  render () {
    const { inputValue } = this.state
    const { isOpen } = this.props

    return (
      <Popup
        isOpen={isOpen}
        onClose={this.closePopup}
      >
        <form
          className={s.CopySkillset}
          onSubmit={this.submitForm}
        >
          <div className={s.CopySkillset__content}>
            <Input
              eventCategory="skillset"
              value={inputValue}
              onChange={this.onChangeInput}
              placeholder="Enter new skillset"
              autoFocus
            />
          </div>

          <SimpleButton
            type="button"
            className={s.CopySkillset__button}
            onClick={this.closePopup}
          >
            Cancel
          </SimpleButton>

          <SimpleButton
            className={s.CopySkillset__button}
            disabled={!inputValue.trim()}
          >
            Copy
          </SimpleButton>
        </form>
      </Popup>
    )
  }
}

export default compose(
  withUser,
  withRouter,
  connect(
    null,
    {
      copyUserSkillset: copyUserSkillsetSaga,
    },
  ),
)(CopySkillset)
