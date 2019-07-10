import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './H1.css'

interface Props {
  className?: string
}

const H1: FC<Props> = ({ children, className }) => {
  return (
    <h1 className={cn(s.H1, className)}>
      {children}
    </h1>
  )
}

export default H1
