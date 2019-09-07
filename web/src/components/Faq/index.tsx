import React, { FC } from 'react'
import { H4 } from '../../UI'
import * as s from './Faq.css'

interface Props {
  title: string
}

const Faq: FC<Props> = ({ title, children }) => {
  return (
    <div className={s.Faq}>
      <H4>{title}</H4>
      {children}
    </div>
  )
}

export default Faq
