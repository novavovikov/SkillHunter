import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import * as s from './SkillsetCreator.css'

const SkillsetCreator: FC = () => {
  return (
    <NavLink
      className={s.SkillsetCreator}
      to={ROUTES.INTRODUCTION}
    >
      Add skillset

      <div className={s.SkillsetCreator__desc}>
        Specialty, hobby or activity
      </div>
    </NavLink>
  )
}

export default SkillsetCreator
