import copy from 'copy-to-clipboard'
import React, { FC } from 'react'
import { ENotifications } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { INotification, IUserResource } from '../../types'
import { analytics } from '../../utils/analytics'
import { urlNormalizer } from '../../utils/url'
import * as s from './FoundResource.css'
import { ResourcePreviewInfo } from '../index'

interface Props {
  showNotification: (data: INotification) => void
  data: IUserResource
}

const FoundResource: FC<Props> = ({ data, showNotification }) => {
  const handleCopy = () => {
    const url = urlNormalizer(`${window.location.origin}${ROUTES.RESOURCE}/${data.id}`)

    copy(url)
    showNotification({
      message: 'Link copied',
      type: ENotifications.success,
    })

    analytics({
      event: 'copy_link',
      source_url: url
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
