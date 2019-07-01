import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SkillsSuggestion } from '../../components'
import { addSkillsSaga } from '../../redux/actions/skills'
import { IconButton, Popup } from '../../UI'
import * as s from './SkillCreator.css'

interface Props {
  skillsetId: number | null
  addSkills: (skillsetId: number, skills: string[]) => void
}

interface State {
  isOpen: boolean
}

class SkillCreator extends Component<Props, State> {
  state = {
    isOpen: false,
  }

  showPopup = () => {
    this.setState({
      isOpen: true,
    })
  }

  closePopup = () => {
    this.setState({
      isOpen: false,
    })
  }

  addSkills = (skills: string[]) => {
    const { skillsetId, addSkills } = this.props

    if (skillsetId) {
      addSkills(skillsetId, skills)
    }
  }

  render () {
    const { isOpen } = this.state

    return (
      <div className={s.SkillCreator}>
        <IconButton
          size="s"
          onClick={this.showPopup}
        >
          Add skill
        </IconButton>

        <Popup
          isOpen={isOpen}
          onClose={this.closePopup}
        >
          <SkillsSuggestion
            onSubmit={this.addSkills}
            onClose={this.closePopup}
          />
        </Popup>
      </div>
    )
  }
}

export default connect(
  null,
  {
    addSkills: addSkillsSaga,
  },
)(SkillCreator)
