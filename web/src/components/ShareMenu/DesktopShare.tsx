import React, { Component } from 'react'
import copy from 'copy-to-clipboard'
import { connect } from 'react-redux'
import { ENotifications } from '../../constants/notification'
import { addNotification } from '../../redux/actions/notifications'
import { IconTypes, INotification } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import { analytics } from '../../utils/analytics'
import { getShareLink, SHARE_SITES } from '../../utils/share'
import { urlNormalizer } from '../../utils/url'
import { ShareProps } from './index'
import s from './ShareMenu.css'

interface Props extends ShareProps {
  showNotification: (data: INotification) => void
}

const SHARE_LINKS = [
  {
    label: 'Facebook',
    system: SHARE_SITES.facebook,
    icon: IconTypes.facebook
  },
  {
    label: 'Twitter',
    system: SHARE_SITES.twitter,
    icon: IconTypes.twitter
  },
  {
    label: 'LinkedIn',
    system: SHARE_SITES.linkedIn,
    icon: IconTypes.linkedin
  },
  {
    label: 'Reddit',
    system: SHARE_SITES.reddit,
    icon: IconTypes.reddit
  },
  {
    label: 'VKontakte',
    system: SHARE_SITES.vk,
    icon: IconTypes.vk
  },
  {
    label: 'Telegram',
    system: SHARE_SITES.telegram,
    icon: IconTypes.telegram
  },
]

class ShareMenu extends Component<Props> {
  handleShare = (system: SHARE_SITES, url: string) => {
    const { text, eventCategory } = this.props
    const link = getShareLink(system, { url, text })

    analytics({
      event: 'click_share',
      share_system: system,
      category: eventCategory
    })

    window.open(link, 'popup', 'width=600,height=600')
  }

  handleCopy = () => {
    const { link, showNotification, eventCategory } = this.props
    const url = urlNormalizer(`${window.location.origin}${link}`)

    copy(url)

    showNotification({
      message: 'Link copied',
      type: ENotifications.success
    })

    analytics({
      event: 'copy_link',
      source_url: url,
      category: eventCategory
    })
  }

  render () {
    const { link, label } = this.props
    const url = urlNormalizer(`${window.location.origin}${link}`)

    return (
      <Menu
        icon={IconTypes.share}
        label={label}
      >
        <Item onClick={this.handleCopy}>
          <Icon
            type={IconTypes.copy}
            className={s.ShareMenu__ico}
          />
          Copy link
        </Item>

        {SHARE_LINKS.map(({ label, system, icon }, index) => (
          <Item
            key={index}
            onClick={() => this.handleShare(system, url)}
          >
            <Icon
              type={icon}
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
