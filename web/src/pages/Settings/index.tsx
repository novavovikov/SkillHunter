import React, { FC } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Page, RemoveAccount } from '../../components'
import { addNotification } from '../../redux/actions/notifications'
import { NotificationType } from '../../types'

interface Props {
  showNotification: (data: NotificationType) => void
}

const Settings: FC<Props> = ({ showNotification }) => {
  return (
    <Page sidebar={false}>
      <RemoveAccount/>
    </Page>
  )
}

export default compose(
  connect(null, {
    showNotification: addNotification,
  }),
)(Settings)
