import React, { FC } from 'react'
import * as s from './Filters.css'

const Filters: FC = () => {
  return (
    <div className={s.Filters}>
      <button className={s.Filters__item}>All skills</button>
      <button className={s.Filters__item}>All types</button>
    </div>
  )
}

export default Filters
