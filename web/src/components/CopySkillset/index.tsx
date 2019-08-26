import React, { ChangeEvent, Component } from 'react'
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

  copySkillset = () => {
    const { inputValue } = this.state
    const { copyUserSkillset, onClose, source } = this.props

    copyUserSkillset(source.name, inputValue.trim())
    onClose()

    analytics({
      event: 'click_copy_skillset',
      category: 'skillset',
    })
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render () {
    const { inputValue } = this.state
    const { isOpen, onClose } = this.props

    return (
      <Popup
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={s.CopySkillset}>
          <div className={s.CopySkillset__content}>
            <Input
              eventCategory="skillset"
              value={inputValue}
              onChange={this.onChangeInput}
              placeholder="Enter new skillset"
            />
          </div>

          <SimpleButton
            className={s.CopySkillset__button}
            onClick={onClose}
          >
            Cancel
          </SimpleButton>

          <SimpleButton
            className={s.CopySkillset__button}
            onClick={this.copySkillset}
            disabled={!inputValue.trim()}
          >
            Copy
          </SimpleButton>
        </div>
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
