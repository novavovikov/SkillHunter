import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './H5.css'

interface Props {
  className?: string
}

const H5: FC<Props> = ({ className, children }) => {
  return (
    <h4 className={cn(s.H5, className)}>
      {children}
    </h4>
  )
}

export default H5
