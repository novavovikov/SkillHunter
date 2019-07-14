import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { RoadMap } from '../../components'
import { H2 } from '../../UI'
import * as s from './SignUpBlock.css'

const SignUpBlock: FC = () => {
  return (
    <div className={s.SignUpBlock}>
      <H2 className={s.SignUpBlock__title}>
        Sign up to
      </H2>

      <RoadMap/>

      <Link
        to={ROUTES.INTRODUCTION}
        className={s.SignUpBlock__submit}
      >
        Start
        <span className={s.SignUpBlock__submitLabel}>
          improve skills
        </span>
      </Link>
    </div>
  )
}

export default SignUpBlock
