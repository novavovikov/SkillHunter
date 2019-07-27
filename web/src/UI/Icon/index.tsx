import cn from 'classnames'
import React, { FC } from 'react'
import * as s from './Icon.css'
import addIcon from './icons/add-ico.svg?inline'
import arrowDownIcon from './icons/arrow-down-ico.svg?inline'
import arrowLeftIcon from './icons/arrow-left-ico.svg?inline'
import arrowRightIcon from './icons/arrow-right-ico.svg?inline'
import arrowUpIcon from './icons/arrow-up-ico.svg?inline'
import binIcon from './icons/bin-ico.svg?inline'
import closeIcon from './icons/close-ico.svg?inline'
import copyIcon from './icons/copy-ico.svg?inline'
import dotsIcon from './icons/dots-ico.svg?inline'
import facebookIcon from './icons/facebook-ico.svg?inline'
import heartFilledIcon from './icons/heart-filled-ico.svg?inline'
import heartIcon from './icons/heart-ico.svg?inline'
import linkedinIcon from './icons/linkedin-ico.svg?inline'
import redditIcon from './icons/reddit-ico.svg?inline'
import removeIcon from './icons/remove-ico.svg?inline'
import shareIcon from './icons/share-ico.svg?inline'
import telegramIcon from './icons/telegram-ico.svg?inline'
import twitterIcon from './icons/twitter-ico.svg?inline'
import userIcon from './icons/user-ico.svg?inline'
import vkIcon from './icons/vk-ico.svg?inline'

type IconSize = 'free' | '18' | '24' | null

interface Props {
  type: string
  className?: string
  active?: boolean
  size?: IconSize
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
    case 'arrow-left':
      return arrowLeftIcon
    case 'arrow-right':
      return arrowRightIcon

    case 'close':
      return closeIcon
    case 'add':
      return addIcon
    case 'remove':
      return removeIcon
    case 'copy':
      return copyIcon

    case 'facebook':
      return facebookIcon
    case 'twitter':
      return twitterIcon
    case 'linkedin':
      return linkedinIcon
    case 'reddit':
      return redditIcon
    case 'telegram':
      return telegramIcon
    case 'vk':
      return vkIcon
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
        [s.Icon_lg]: size === '18',
        [s.Icon_xl]: size === '24',
      }, className)}
      dangerouslySetInnerHTML={{ __html: getIcon(type) }}
    />
  )
}

export default Icon
