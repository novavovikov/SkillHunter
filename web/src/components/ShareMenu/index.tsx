import copy from 'copy-to-clipboard'
import React from 'react'
import { connect } from 'react-redux'
import { NotificationTypes } from '../../constants/notification'
import { addNotification } from '../../redux/actions/notifications'
import { NotificationType } from '../../types'
import { Item, Menu, Icon } from '../../UI'
import { getShareLink, SHARE_SITES } from '../../utils/share'
import { urlNormalizer } from '../../utils/url'
import s from './ShareMenu.css'

interface Props {
  showNotification: (data: NotificationType) => void
  link: string
  text: string
  label?: string
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
    const { link, label, showNotification } = this.props
    const url = urlNormalizer(`${window.location.origin}${link}`)

    return (
      <Menu
        icon="share"
        label={label}
      >
        <Item
          onClick={() => {
            copy(url)
            showNotification({
              message: 'Link copied',
              type: NotificationTypes.success
            })
          }}
        >
          <Icon
            type="copy"
            className={s.ShareMenu__ico}
          />
          Copy link
        </Item>
        {SHARE_LINKS.map(({ label, system }, index) => (
          <Item
            key={index}
            onClick={() => this.handleShare(system, url)}
          >
            <Icon
              type={system}
              className={s.ShareMenu__ico}
            />
            {label}
          </Item>
        ))}
      </Menu>
    )
  }
}

export default connect(
  null, {
    showNotification: addNotification,
  },
)(ShareMenu)
