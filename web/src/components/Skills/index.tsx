import * as React from 'react'
import { Checkbox } from '../../UI'
import * as s from './Skills.css'

interface Skill {
  id: number,
  text: string
}

interface Props {
  skills: Skill[],
  selectedSkills: Skill[]
}

const Skills: React.FC<Props> = ({ skills }) => {
  return (
    <div className={s.Skills}>
      <div className={s.Skills__header}>
        <div>
          Предложения
        </div>

        <button
          type={'button'}
        >
          Показать отмеченные
        </button>
      </div>

      <div className={s.Skills__body}>
        {skills.map(({ id, text }) => (
          <div
            key={id}
            className={s.Skills__item}
          >
            {text}
            <Checkbox/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
