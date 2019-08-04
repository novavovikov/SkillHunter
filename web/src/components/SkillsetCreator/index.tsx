import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { analytics } from '../../utils/analytics'
import * as s from './SkillsetCreator.css'

class SkillsetCreator extends Component {
  handleAdd = () => {
    analytics({
      event: 'click_add_skillset',
      category: 'skillset'
    })
  }

  render () {
    return (
      <NavLink
        className={s.SkillsetCreator}
        to={ROUTES.INTRODUCTION}
        onClick={this.handleAdd}
      >
        Add skillset

        <div className={s.SkillsetCreator__desc}>
          Specialty, hobby or activity
        </div>
      </NavLink>
    )
  }
}

export default SkillsetCreator
