import copy from 'copy-to-clipboard'
import React, { FC } from 'react'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { NotificationType, UserResourceType } from '../../types'
import { urlNormalizer } from '../../utils/url'
import * as s from './FoundResource.css'
import { ResourcePreviewInfo } from '../index'

interface Props {
  showNotification: (data: NotificationType) => void
  data: UserResourceType
}

const FoundResource: FC<Props> = ({ data, showNotification }) => {
  const handleCopy = () => {
    const url = urlNormalizer(`${window.location.origin}${ROUTES.RESOURCE}/${data.id}`)

    copy(url)
    showNotification({
      message: 'Link copied',
      type: NotificationTypes.success,
    })
  }

  return (
    <div className={s.FoundResource}>
      <ResourcePreviewInfo
        className={s.FoundResource__content}
        data={data}
      />

      <button
        className={s.FoundResource__link}
        onClick={handleCopy}
      >
        Copy link
      </button>
    </div>
  )
}

export default FoundResource
