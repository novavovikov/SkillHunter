import React, { FC } from 'react'
import * as s from './H3.css'
import cn from 'classnames'

interface Props {
  className?: string
}

const H3: FC<Props> = ({ children, className }) => {
  return (
    <h2 className={cn(s.H3, className)}>
      {children}
    </h2>
  )
}

export default H3
