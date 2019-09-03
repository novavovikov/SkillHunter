import React, { FC } from 'react'
import { H3 } from '../../../UI'
import s from './Content.css'

interface Props {
  title?: string
  text: string
}

const Content: FC<Props> = (
  {
    title,
    text,
  },
) => (
  <div className={s.Content}>
    {title && (
      <H3 className={s.Content__title}>
        {title}
      </H3>
    )}
    <div className={s.Content__text} dangerouslySetInnerHTML={{ __html: text }}/>
  </div>
)

export default Content
