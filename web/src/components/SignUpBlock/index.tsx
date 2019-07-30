import React, { Component, FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { RoadMap } from '../../components'
import { H2 } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './SignUpBlock.css'

class SignUpBlock extends Component {
  handleLink = () => {
    analytics({
      event: 'click_improve_btn'
    })
  }

  render () {
    return (
      <div className={s.SignUpBlock}>
        <H2 className={s.SignUpBlock__title}>
          Sign up to
        </H2>

        <RoadMap/>

        <Link
          to={ROUTES.INTRODUCTION}
          className={s.SignUpBlock__submit}
          onClick={this.handleLink}
        >
          Start
          <span className={s.SignUpBlock__submitLabel}>
          improve skills
        </span>
        </Link>
      </div>
    )
  }
}

export default SignUpBlock
