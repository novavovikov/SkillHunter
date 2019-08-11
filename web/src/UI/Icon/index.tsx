import cn from 'classnames'
import React, { FC } from 'react'
import { IconSizes, IconTypes } from '../../types'
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

interface Props {
  type: IconTypes
  className?: string
  active?: boolean
  size?: IconSizes
}

const getIcon = (type: IconTypes) => {
  switch (type) {
    case IconTypes.user:
      return userIcon
    case IconTypes.bin:
      return binIcon
    case IconTypes.heart:
      return heartIcon
    case IconTypes.heartFilled:
      return heartFilledIcon
    case IconTypes.share:
      return shareIcon
    case IconTypes.dots:
      return dotsIcon

    case IconTypes.arrowUp:
      return arrowUpIcon
    case IconTypes.arrowDown:
      return arrowDownIcon
    case IconTypes.arrowLeft:
      return arrowLeftIcon
    case IconTypes.arrowRight:
      return arrowRightIcon

    case IconTypes.close:
      return closeIcon
    case IconTypes.add:
      return addIcon
    case IconTypes.remove:
      return removeIcon
    case IconTypes.copy:
      return copyIcon

    case IconTypes.facebook:
      return facebookIcon
    case IconTypes.twitter:
      return twitterIcon
    case IconTypes.linkedin:
      return linkedinIcon
    case IconTypes.reddit:
      return redditIcon
    case IconTypes.telegram:
      return telegramIcon
    case IconTypes.vk:
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
