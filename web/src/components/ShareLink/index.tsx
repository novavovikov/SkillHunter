import React, { FC } from 'react'
import { getShareLink, SHARE_SITES, ShareParams } from '../../utils/share'
import * as s from './ShareLink.css'

interface Props {
  params: ShareParams
  system: SHARE_SITES
}

const ShareLink: FC<Props> = ({ system, children, params }) => {
  const url = getShareLink(system, params)

  const onClick = (e: any) => {
    e.preventDefault()

    window.open(url, 'popup', 'width=600,height=600')
  }

  return (
    <a
      target="_blank"
      className={s.ShareLink}
      href={url}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default ShareLink
