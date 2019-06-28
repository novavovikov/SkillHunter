import React, { FC } from 'react'
import * as s from './H4.css'

const H4: FC = ({ children }) => {
  return (
    <h4 className={s.H4}>
      {children}
    </h4>
  )
}

export default H4
