import React, { FC } from 'react'
import DesktopShare from './DesktopShare'
import MobileShare from './MobileShare'

export interface ShareProps {
  eventCategory: string
  link: string
  text: string
  label?: string
}

const ShareMenu: FC<ShareProps> = (props) => {
  if (navigator.share) {
    return <MobileShare {...props}/>
  }

  return (
    <DesktopShare {...props}/>
  )
}

export default ShareMenu
