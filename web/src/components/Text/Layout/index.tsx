import React, { FC } from 'react'
import { H1, H4 } from '../../../UI'
import s from './Layout.css'

interface Props {
  title: string
  subtitle?: string
  text?: string
}

const Layout: FC<Props> = (
  {
    children,
    title,
    subtitle,
    text,
  },
) => (
  <div className={s.Layout}>
    <div className={s.Layout__caption}>
      <H1 className={s.Layout__title}>{title}</H1>

      {subtitle && (
        <H4 className={s.Layout__subtitle}>
          {subtitle}
        </H4>
      )}
    </div>

    <div className={s.Layout__content}>{text}{children}</div>
  </div>
)

export default Layout
