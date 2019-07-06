import cn from 'classnames'
import React, { FC } from 'react'
import * as s from './Icon.css'
import arrowDownIcon from './icons/arrow-down-ico.svg?inline'
import arrowRightIcon from './icons/arrow-right-ico.svg?inline'
import arrowUpIcon from './icons/arrow-up-ico.svg?inline'
import binIcon from './icons/bin-ico.svg?inline'
import dotsIcon from './icons/dots-ico.svg?inline'
import heartFilledIcon from './icons/heart-filled-ico.svg?inline'
import heartIcon from './icons/heart-ico.svg?inline'
import shareIcon from './icons/share-ico.svg?inline'
import userIcon from './icons/user-ico.svg?inline'
import removeIcon from './icons/remove-ico.svg?inline'

interface Props {
  type: string
  className?: string
  active?: boolean
  size?: string | null
}

const getIcon = (type: string) => {
  switch (type) {
    case 'user':
      return userIcon
    case 'bin':
      return binIcon
    case 'heart':
      return heartIcon
    case 'heart-filled':
      return heartFilledIcon
    case 'share':
      return shareIcon
    case 'dots':
      return dotsIcon
    case 'arrow-up':
      return arrowUpIcon
    case 'arrow-down':
      return arrowDownIcon
    case 'arrow-right':
      return arrowRightIcon
    case 'remove':
      return removeIcon
    default:
      return null
  }
}

const Icon: FC<Props> = (
  {
    type,
    active,
    size,
    className,
  },
) => {
  return (
    <span
      className={cn(s.Icon, {
        [s.Icon_active]: active,
        [s.Icon_free]: size === 'free',
        [s.Icon_lg]: size === 'lg',
        [s.Icon_xl]: size === 'xl',
      }, className)}
      dangerouslySetInnerHTML={{ __html: getIcon(type) }}
    />
  )
}

export default Icon
