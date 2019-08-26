import React, { Component, FormEvent } from 'react'
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
  submitForm = (e: FormEvent) => {
    e.preventDefault()
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
        <form
          className={s.RemoveSkillset}
          onSubmit={this.submitForm}
        >
          <div className={s.RemoveSkillset__content}>
            <h5 className={s.RemoveSkillset__title}>
              Delete skillset?
            </h5>

            {skillset.name}
          </div>

          <SimpleButton
            type="button"
            className={s.RemoveSkillset__button}
            onClick={onClose}
          >
            Cancel
          </SimpleButton>

          <SimpleButton className={s.RemoveSkillset__button}>
            Delete
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
      removeUserSkillset: removeUserSkillsetSaga,
    },
  ),
)(RemoveSkillset)
