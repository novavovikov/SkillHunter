import cn from 'classnames'
import React, { Component } from 'react'
import { H4 } from '../../UI'
import { SkillsSearch } from '../index'
import * as s from './SkillsSuggestion.css'

export interface SkillsSuggestionProps {
  eventCategory: string
  skillset: string
  theme?: 'step'
  onSubmit: (skills: string[]) => void
  onCancel: () => void
}

class SkillsSuggestion extends Component<SkillsSuggestionProps> {
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
