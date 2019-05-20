import * as React from 'react'
import * as s from './H3.css'

const H3: React.FC = ({ children }) => {
  return (
    <h3 className={s.H3}>
      {children}
    </h3>
  )
}

export default H3
