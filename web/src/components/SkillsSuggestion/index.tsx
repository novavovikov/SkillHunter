import React, { Component } from 'react'
import { H4 } from '../../UI'
import { SkillsSearch } from '../index'
import * as s from './SkillsSuggestion.css'

interface Props {
  onSubmit: (skills: string[]) => void
  onClose: () => void
}

class SkillsSuggestion extends Component<Props> {
  render () {
    const { onSubmit, onClose } = this.props

    return (
      <div className={s.SkillsSuggestion}>
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
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    )
  }
}

export default SkillsSuggestion
