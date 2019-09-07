import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './Mark.css'

interface Props {
  color: 'green' | 'blue' | 'orange'
}

const Mark: FC<Props> = ({ children, color }) => {
  return (
    <mark className={cn(s.Mark, {
      [s.Mark_green]: color === 'green',
      [s.Mark_blue]: color === 'blue',
      [s.Mark_orange]: color === 'orange',
    })}>{children}</mark>
  )
}

export default Mark
