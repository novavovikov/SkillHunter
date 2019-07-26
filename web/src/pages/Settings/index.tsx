import React, { FC } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Page, RemoveAccount } from '../../components'
import { addNotification } from '../../redux/actions/notifications'
import { INotification } from '../../types'

interface Props {
  showNotification: (data: INotification) => void
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
