import React, { FC } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { withUser } from '../../providers/User'
import { removeUserSkillsetSaga } from '../../redux/actions/user'
import { SimpleButton } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './RemoveSkillset.css'

interface Props {
  skillSetId: number
  removeUserSkillset: (skillSetId: number) => void
  onClose: () => void
}

const RemoveSkillset: FC<Props> = ({ skillSetId, removeUserSkillset, onClose, children }) => {
  const deleteSkillset = () => {
    removeUserSkillset(skillSetId)
    onClose()

    analytics({
      event: 'click_delete_skillset',
      category: 'skillset'
    })
  }

  return (
    <div className={s.RemoveSkillset}>
      <div className={s.RemoveSkillset__content}>
        {children}
      </div>

      <SimpleButton
        className={s.RemoveSkillset__button}
        onClick={onClose}
      >
        Cancel
      </SimpleButton>

      <SimpleButton
        className={s.RemoveSkillset__button}
        onClick={deleteSkillset}
      >
        Delete
      </SimpleButton>
    </div>
  )
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
