import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { SkillsSuggestion } from '../../components'
import { CREATOR_SKILL_QUERY } from '../../constants/routing'
import { addSkillsSaga } from '../../redux/actions/skills'
import { IconButton, Popup } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './SkillCreator.css'
import { addParamToQuery, deleteParamFromQuery } from '../../utils/url'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  skillsetId: number | null
  addSkills: (skillsetId: number, skills: string[]) => void
}

class SkillCreator extends Component<Props> {
  get urlSearchParams () {
    const { location } = this.props

    return new URLSearchParams(location.search)
  }

  showPopup = () => {
    const { history, location } = this.props
    const search = addParamToQuery(
      location.search,
      CREATOR_SKILL_QUERY.param,
      CREATOR_SKILL_QUERY.value,
    )

    history.push({ search })
    analytics({
      event: 'click_add_skill',
      category: 'skillset'
    })
  }

  closePopup = () => {
    const { location, history } = this.props
    const search = deleteParamFromQuery(location.search, CREATOR_SKILL_QUERY.param)

    history.push({ search })
  }

  addSkills = (skills: string[]) => {
    const { skillsetId, addSkills } = this.props

    if (skillsetId) {
      addSkills(skillsetId, skills)
      this.closePopup()
    }
  }

  getOpenedStatus = () => {
    const queryParamValue = this.urlSearchParams.get(CREATOR_SKILL_QUERY.param)

    return queryParamValue === CREATOR_SKILL_QUERY.value
  }

  render () {
    const { match } = this.props
    const isOpen = this.getOpenedStatus()

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
            eventCategory="skillset"
            skillset={match.params.skillset}
            onSubmit={this.addSkills}
            onCancel={this.closePopup}
          />
        </Popup>
      </div>
    )
  }
}

export default compose<any>(
  withRouter,
  connect(
    null,
    {
      addSkills: addSkillsSaga,
    },
  ),
)(SkillCreator)
