import * as React from 'react'
import { Page, Filters, Skill } from '../../components'
import { H2 } from '../../UI'
import * as s from './Library.css'

const Library: React.FC = () => {
  return (
    <Page>
      <div className={s.Library__header}>
        <H2 className={s.Library__title}>Library</H2>
        <Filters/>
      </div>

      {[1, 2, 3].map(item => (
        <Skill
          key={item}
        />
      ))}
    </Page>
  )
}

export default Library
