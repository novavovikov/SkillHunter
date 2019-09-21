import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { H2 } from '../../UI'
import { SkillsSuggestion } from '../index'
import * as s from './SkillStep.css'

interface Props extends RouteComponentProps {
  skillset: string
  onCancel: () => void
  onSubmit: (skills: string[]) => void
}

class SkillStep extends Component<Props> {
  render () {
    const { onCancel, onSubmit, skillset } = this.props

    return (
      <div className={s.SkillStep}>
        <H2 className={s.SkillStep__title}>
          Add skills to your skillset
        </H2>

        <SkillsSuggestion
          eventCategory="introduction_2"
          theme="step"
          skillset={skillset}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    )
  }
}

export default withRouter(SkillStep)

