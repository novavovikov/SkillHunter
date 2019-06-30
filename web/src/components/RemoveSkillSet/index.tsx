import React, { FC } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { withUser } from '../../providers/User'
import { removeUserProfessionSaga } from '../../redux/actions/user'
import { SimpleButton } from '../../UI'
import * as s from './RemoveSkillSet.css'

interface Props {
  skillSetId: number
  removeUserProfession: (skillSetId: number) => void
  onClose: () => void
}

const RemoveSkillSet: FC<Props> = ({ skillSetId, removeUserProfession, onClose, children }) => {
  const deleteSkillSet = () => {
    removeUserProfession(skillSetId)
    onClose()
  }

  return (
    <div className={s.RemoveSkillSet}>
      <div className={s.RemoveSkillSet__content}>
        {children}
      </div>

      <SimpleButton
        className={s.RemoveSkillSet__button}
        onClick={onClose}
      >
        Cancel
      </SimpleButton>

      <SimpleButton
        className={s.RemoveSkillSet__button}
        onClick={deleteSkillSet}
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
      removeUserProfession: removeUserProfessionSaga,
    },
  ),
)(RemoveSkillSet)
