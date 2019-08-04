import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { H2 } from '../../UI'
import { SkillsSuggestion } from '../index'
import * as s from './SkillStep.css'

interface Props extends RouteComponentProps {
  setStep?: (id: string) => void,
  onSubmit: (skills: string[]) => void,
}

class SkillStep extends React.Component<Props> {
  onCancel = () => {
    const { setStep } = this.props

    if (typeof setStep === 'function') {
      setStep('Skillset')
    }
  }

  render () {
    const { onSubmit } = this.props

    return (
      <div className={s.SkillStep}>
        <H2 className={s.SkillStep__title}>
          Add skills to your skillset
        </H2>

        <SkillsSuggestion
          eventCategory="introduction_2"
          theme="step"
          onSubmit={onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

export default withRouter(SkillStep)

