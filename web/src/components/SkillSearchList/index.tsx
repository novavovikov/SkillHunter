import React, { ChangeEvent, Component } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { ISuggestion } from '../../types'
import { Checkbox } from '../../UI'
import * as s from './SkillSearchList.css'

interface Props {
  title: string
  skills: ISuggestion[]
  selectedSkills: ISuggestion[]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

class SkillSearchList extends Component<Props> {
  render () {
    const {
      title,
      skills,
      selectedSkills,
      onChange,
    } = this.props

    if (!skills.length) {
      return null
    }

    return (
      <div className={s.SkillSearchList}>
        <h5 className={s.SkillSearchList__title}>
          {title}
        </h5>

        <Scrollbar
          autoHeight
          autoHide
          autoHeightMin={0}
          autoHeightMax={200}
        >
          {skills.map(({ id, name }: ISuggestion) => (
            <label
              key={id}
              className={s.SkillSearchList__row}
            >
              <div className={s.SkillSearchList__checkbox}>
                <Checkbox
                  value={id}
                  onChange={onChange}
                  checked={!!selectedSkills.find((skill: ISuggestion) => skill.id === id)}
                />
              </div>
              <div className={s.SkillSearchList__content}>
                {name}
              </div>
            </label>
          ))}
        </Scrollbar>
      </div>
    )
  }
}

export default SkillSearchList
