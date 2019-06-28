import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './H2.css'

interface Props {
  className?: string
}

const H2: FC<Props> = ({ children, className }) => {
  return (
    <h2 className={cn(s.H2, className)}>
      {children}
    </h2>
  )
}

export default H2
