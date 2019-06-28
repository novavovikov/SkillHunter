import React from 'react'
import { H3 } from '../../UI'
import * as s from './Faq.css'

interface Props {
  title: string
}

const Faq: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={s.Faq}>
      <H3>{title}</H3>
      {children}
    </div>
  )
}

export default Faq
