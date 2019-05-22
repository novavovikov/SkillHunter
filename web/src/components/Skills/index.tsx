import * as React from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { Checkbox } from '../../UI'
import * as s from './Skills.css'

interface Skill {
  id: number,
  name: string
}

interface Props {
  setSkills: (skills: Skill[]) => void
  setSelectedSkills: (skills: Skill[]) => void
  skills: Skill[]
  selectedSkills: Skill[]
}

const Skills: React.FC<Props> = (
  {
    skills,
    setSkills,
    selectedSkills,
    setSelectedSkills
  },
) => {
  const handleCheckbox = (checked: boolean, skill: Skill) => {
    checked
      ? setSelectedSkills([...selectedSkills, skill])
      : setSelectedSkills(selectedSkills.filter(({ name }) => name !== skill.name))
  }

  const skillList = [...skills, ...selectedSkills].reduce((acc, skill: Skill) => {
    if (acc.some(({ name }) => name === skill.name)) {
      return acc
    }

    return [...acc, skill]
  }, [])

  return (
    <div className={s.Skills}>
      <div className={s.Skills__header}>
        <div>
          {
            skills.length
            ? 'Предложения'
            : 'Не выбрано ни одного скила'
          }
        </div>

        {selectedSkills.length > 0 && (
          <button
            type={'button'}
            className={s.Skills__btn}
            onClick={() => setSkills([])}
          >
            Показать отмеченные
          </button>
        )}
      </div>

      <Scrollbar
        autoHeight
        autoHeightMin={250}
        autoHeightMax={250}
        className={s.Skills__body}
      >
        {skillList.map(skill => {
          const isChecked: boolean = selectedSkills.some(({ name }) => name === skill.name)

          return (
            <div
              key={skill.id}
              className={s.Skills__item}
              onClick={() =>  handleCheckbox(!isChecked, skill)}
            >
              {skill.name}
              <Checkbox
                onChange={() => handleCheckbox(isChecked, skill)}
                checked={isChecked}
              />
            </div>
          )
        })}
      </Scrollbar>
    </div>
  )
}

export default Skills
