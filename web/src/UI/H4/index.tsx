import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './H4.css'

interface Props {
  className?: string
}

const H4: FC<Props> = ({ className, children }) => {
  return (
    <h4 className={cn(s.H4, className)}>
      {children}
    </h4>
  )
}

export default H4
