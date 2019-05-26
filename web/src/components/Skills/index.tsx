import * as React from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { Checkbox } from '../../UI'
import * as s from './Skills.css'

interface Skill {
  id: number,
  name: string
}

interface Props {
  value: string
  setSkills: (skills: Skill[]) => void
  setSelectedSkills: (skills: Skill[]) => void
  skills: Skill[]
  selectedSkills: Skill[]
}

interface State {
  onlySelected: boolean
}

class Skills extends React.Component<Props, State> {
  state = {
    onlySelected: false,
  }

  handleCheckbox = (checked: boolean, skill: Skill) => {
    const { setSelectedSkills, selectedSkills } = this.props

    checked
      ? setSelectedSkills([...selectedSkills, skill])
      : setSelectedSkills(selectedSkills.filter(({ name }) => name !== skill.name))
  }

  getSkillList = () => {
    const { onlySelected } = this.state
    const { selectedSkills, skills, value } = this.props

    if (onlySelected) {
      return selectedSkills
    }

    const startArr = value
      ? [{ id: -1, name: value }]
      : []

    return [...skills, ...selectedSkills].reduce((acc, skill: Skill) => {
      if (acc.some(({ name }) => name.toLowerCase() === skill.name.toLowerCase())) {
        return acc
      }

      return [...acc, skill]
    }, startArr)
  }

  toggleSelected = () => {
    this.setState({
      onlySelected: !this.state.onlySelected,
    })
  }

  render () {
    const { onlySelected } = this.state
    const {
      value,
      skills,
      selectedSkills,
    } = this.props

    const skillList = this.getSkillList()
    const hasItems = selectedSkills.length > 0 || skills.length > 0 || value

    return (
      <div className={s.Skills}>
        <div className={s.Skills__header}>
          {hasItems && (
            <>
              <div>
                Предложения
              </div>

              <button
                type={'button'}
                className={s.Skills__btn}
                onClick={this.toggleSelected}
              >
                {onlySelected
                  ? 'Все'
                  : 'Показать отмеченные'
                }
              </button>
            </>
          )}
        </div>

        <Scrollbar
          autoHeight
          autoHeightMin={250}
          autoHeightMax={250}
          className={s.Skills__body}
        >
          {skillList.map((skill, index) => {
            const isChecked: boolean = selectedSkills.some(({ name }) => name === skill.name)

            return (
              <div
                key={index}
                className={s.Skills__item}
                onClick={() => this.handleCheckbox(!isChecked, skill)}
              >
                {skill.name}
                <Checkbox
                  onChange={() => this.handleCheckbox(isChecked, skill)}
                  checked={isChecked}
                />
              </div>
            )
          })}
        </Scrollbar>
      </div>
    )
  }
}

export default Skills
