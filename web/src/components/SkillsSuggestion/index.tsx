import React, { Component } from 'react'
import cn from 'classnames'
import { H4 } from '../../UI'
import { SkillsSearch } from '../index'
import * as s from './SkillsSuggestion.css'

interface Props {
  theme?: 'step'
  onSubmit: (skills: string[]) => void
  onCancel: () => void
}

class SkillsSuggestion extends Component<Props> {
  render () {
    const { onSubmit, onCancel, theme } = this.props

    return (
      <div className={cn(s.SkillsSuggestion)}>
        <div className={s.SkillsSuggestion__header}>
          <H4 className={s.SkillsSuggestion__title}>
            Choose one or more skills
          </H4>
          <div>
            For added new skill type in name of skill and pick it
          </div>
        </div>

        <div className={s.SkillsSuggestion__body}>
          <SkillsSearch
            theme={theme}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </div>
      </div>
    )
  }
}

export default SkillsSuggestion
