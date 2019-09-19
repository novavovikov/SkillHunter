import React, { FC } from 'react'
import { Page, RoadMap, Subscribe } from '../../components'
import { H2, Head } from '../../UI'
import * as s from './Mock.css'

interface Props {
  title: string
}

const Mock: FC<Props> = ({ title }) => {
  return (

    <Page>
      <Head title={title}/>
      <div className={s.Mock}>
        <H2 className={s.Mock__title}>
          {title}
        </H2>

        <div className={s.Mock__text}>
          We have so far made it possible to create skillsets, collect resources and share them. Below you can see the
          way that we consider necessary for the process of self-development. What we will do next is for you to decide.
        </div>

        <RoadMap/>
        <Subscribe/>
      </div>
    </Page>
  )
}

export default Mock
