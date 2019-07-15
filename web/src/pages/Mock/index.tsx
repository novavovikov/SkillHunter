import React, { FC } from 'react'
import { Page, RoadMap } from '../../components'
import { H2 } from '../../UI'
import * as s from './Mock.css'

interface Props {
  title: string
}

const Mock: FC<Props> = ({ title }) => {
  return (

    <Page>
      <div className={s.Mock}>
        <H2 className={s.Mock__title}>
          {title}
        </H2>

        <div className={s.Mock__text}>
          To date, we have made it possible to create skillsets, collect resources and share them. Below you see the
          flow that we consider necessary for the process of self-development. What we will do next is up to you.
        </div>

        <RoadMap/>
      </div>
    </Page>
  )
}

export default Mock
