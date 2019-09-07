import React, { FC } from 'react'
import cn from 'classnames'
import { H3 } from '../../UI'
import * as  s from './Welcome.css'

interface Props {
  icon?: 'greeting' | 'mission' | 'archive' | 'list' | 'route'
}

const Title: FC<Props> = ({ children, icon }) => {
  return (
    <H3 className={cn(s.Welcome__title, {
      [s.Welcome__title_icon]: icon,
      [s.Welcome__title_greeting]: icon === 'greeting',
      [s.Welcome__title_mission]: icon === 'mission',
      [s.Welcome__title_archive]: icon === 'archive',
      [s.Welcome__title_list]: icon === 'list',
      [s.Welcome__title_route]: icon === 'route',
    })}>
      {children}
    </H3>
  )
}

export default Title
