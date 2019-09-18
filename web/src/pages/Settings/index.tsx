import React, { FC } from 'react'
import { NotificationSettings, Page, RemoveAccount } from '../../components'
import * as s from './Settings.css'

const Settings: FC = () => {
  return (
    <Page sidebar={false}>
      <div className={s.Settings}>
        <div className={s.Settings__section}>
          <div className={s.Settings__content}>
            <NotificationSettings/>
          </div>
        </div>
        <div className={s.Settings__section}>
          <div className={s.Settings__content}>
            <RemoveAccount/>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Settings
