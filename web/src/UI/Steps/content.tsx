import React, { FC } from 'react'
import * as s from './Steps.css'

interface Props {
  id: any,
}

export const Content: FC<Props> = ({ children }) => {
  return (
    <div className={s.Steps__content}>
      {children}
    </div>
  )
}
