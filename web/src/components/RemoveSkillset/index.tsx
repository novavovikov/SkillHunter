import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { withUser } from '../../providers/User'
import { removeUserSkillsetSaga } from '../../redux/actions/user'
import { ISkillset } from '../../types'
import { Popup, SimpleButton } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './RemoveSkillset.css'

interface Props {
  isOpen: boolean
  skillset: ISkillset
  removeUserSkillset: (skillsetId: number) => void
  onClose: () => void
}

class RemoveSkillset extends Component<Props> {
  deleteSkillset = () => {
    const { skillset, removeUserSkillset, onClose } = this.props

    removeUserSkillset(skillset.id)
    onClose()

    analytics({
      event: 'click_delete_skillset',
      category: 'skillset'
    })
  }

  render () {
    const { isOpen, skillset, onClose } = this.props

    return (
      <Popup
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={s.RemoveSkillset}>
          <div className={s.RemoveSkillset__content}>
            <h5 className={s.RemoveSkillset__title}>
              Delete skillset?
            </h5>

            {skillset.name}
          </div>

          <SimpleButton
            className={s.RemoveSkillset__button}
            onClick={onClose}
          >
            Cancel
          </SimpleButton>

          <SimpleButton
            className={s.RemoveSkillset__button}
            onClick={this.deleteSkillset}
          >
            Delete
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
      removeUserSkillset: removeUserSkillsetSaga,
    },
  ),
)(RemoveSkillset)
