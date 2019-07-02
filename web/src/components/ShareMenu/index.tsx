import copy from 'copy-to-clipboard'
import React from 'react'
import { NotificationTypes } from '../../constants/notification'
import { withNotification } from '../../providers/Notification'
import { NotificationApiProps } from '../../providers/Notification/context'
import { Item, Menu } from '../../UI'
import { getShareLink, SHARE_SITES } from '../../utils/share'
import { urlNormalizer } from '../../utils/url'
import * as s from './ShareMenu.css'

interface Props {
  notificationApi: NotificationApiProps
  link: string
  text: string
}

const SHARE_LINKS = [
  {
    label: 'Facebook',
    system: SHARE_SITES.facebook,
  },
  {
    label: 'Twitter',
    system: SHARE_SITES.twitter,
  },
  {
    label: 'LinkedIn',
    system: SHARE_SITES.linkedIn,
  },
  {
    label: 'Reddit',
    system: SHARE_SITES.reddit,
  },
  {
    label: 'VKontakte',
    system: SHARE_SITES.vk,
  },
  {
    label: 'Telegram',
    system: SHARE_SITES.telegram,
  },
]

class ShareMenu extends React.Component<Props> {
  handleShare = (system: SHARE_SITES, url: string) => {
    const { text } = this.props
    const link = getShareLink(system, { url, text })

    window.open(link, 'popup', 'width=600,height=600')
  }

  render () {
    const { link, notificationApi } = this.props
    const url = urlNormalizer(`https://app.skillhunter.io/${link}`)

    return (
      <Menu icon="share">
        <Item
          onClick={() => {
            copy(url)
            notificationApi.showNotification('Link copied', NotificationTypes.success)
          }}
        >
          Copy link
        </Item>
        {SHARE_LINKS.map(({ label, system }, index) => (
          <Item
            key={index}
            onClick={() => this.handleShare(system, url)}
          >
            {label}
          </Item>
        ))}
      </Menu>
    )
  }
}

export default withNotification(ShareMenu)
