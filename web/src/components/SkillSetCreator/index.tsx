import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import * as s from './SkillSetCreator.css'

const SkillSetCreator: FC = () => {
  return (
    <NavLink
      className={s.SkillSetCreator}
      to={ROUTES.INTRODUCTION}
    >
      Add skillset

      <div className={s.SkillSetCreator__desc}>
        Specialty, hobby or activity
      </div>
    </NavLink>
  )
}

export default SkillSetCreator
