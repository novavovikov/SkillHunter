import React, { FC } from 'react'
import { isMobile } from 'mobile-device-detect'
import DesktopShare from './DesktopShare'
import MobileShare from './MobileShare'

export interface ShareProps {
  eventCategory: string
  link: string
  text: string
  image: string
  label?: string
}

const ShareMenu: FC<ShareProps> = (props) => {
  if (navigator.share && isMobile) {
    return <MobileShare {...props}/>
  }

  return (
    <DesktopShare {...props}/>
  )
}

export default ShareMenu
