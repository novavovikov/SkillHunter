import * as React from 'react'
import * as s from './Container.css'

const Container: React.FC = ({ children }) => {
  return (
    <div className={s.Container}>
      {children}
    </div>
  )
}

export default Container
