import React, { Component } from 'react'
import cn from 'classnames'
import { H4 } from '../../UI'
import { SkillsSearch } from '../index'
import * as s from './SkillsSuggestion.css'

interface Props {
  theme?: 'step'
  eventCategory: string
  onSubmit: (skills: string[]) => void
  onCancel: () => void
}

class SkillsSuggestion extends Component<Props> {
  render () {
    return (
      <div className={cn(s.SkillsSuggestion)}>
        <div className={s.SkillsSuggestion__header}>
          <H4 className={s.SkillsSuggestion__title}>
            For added new skill type in name of skill and pick it
          </H4>
          <div>
            Choose one or more skills
          </div>
        </div>

        <div className={s.SkillsSuggestion__body}>
          <SkillsSearch {...this.props}/>
        </div>
      </div>
    )
  }
}

export default SkillsSuggestion
