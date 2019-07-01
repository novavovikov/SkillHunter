import React, { Component } from 'react'
import { SkillsSuggestion } from '../../components'
import { IconButton, Popup } from '../../UI'
import * as s from './SkillCreator.css'

interface Props {

}

interface State {
  isOpen: boolean
}

class SkillCreator extends Component<Props, State> {
  state = {
    isOpen: false
  }

  showPopup = () => {
    this.setState({
      isOpen: true
    })
  }

  closePopup = () => {
    this.setState({
      isOpen: false
    })
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
          <SkillsSuggestion onClose={this.closePopup}/>
        </Popup>
      </div>
    )
  }
}

export default SkillCreator
