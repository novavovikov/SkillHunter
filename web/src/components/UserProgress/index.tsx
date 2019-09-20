import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { ResourcesState } from '../../redux/reducers/resources'
import { IUser } from '../../types'
import * as s from './UserProgress.css'
import { RouteComponentProps, withRouter } from 'react-router'
import { ajax } from '../../utils/ajax'
import { withUser } from '../../providers/User'

interface ActivityByResources {
  Total: number
  Backlog: number
  Plan: number
  Done: number
}

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
  user: IUser
  resources: ResourcesState
}

interface State {
  skillset: ActivityByResources | null
  skill: {
    [skillId: string]: ActivityByResources
  }
}

class UserProgress extends Component<Props, State> {
  state = {
    skillset: null,
    skill: {},
  }

  componentDidMount (): void {
    this.getSkillsetProgress()
    this.getSkillProgress()
  }

  componentDidUpdate ({ match }: Props): void {
    const { skillset } = this.props.match.params

    if (skillset !== match.params.skillset) {
      this.getSkillsetProgress()
    }
  }

  get status () {
    const { skillId } = this.props.match.params
    const { skillset, skill } = this.state
    const skillData = skill[skillId as never]

    if (skillData) {
      return this.calculateProgress(skillData)
    }

    if (skillset) {
      return this.calculateProgress(skillset)
    }

    return 0
  }

  get skillsetId (): number | null {
    const { match, user } = this.props
    const { skillset } = match.params

    if (skillset) {
      const userSkillset = user.skillsets.find(({ name }) => name === skillset)

      return userSkillset ? userSkillset.id : null
    }

    return null
  }

  calculateProgress = (data: ActivityByResources | null) => {
    if (!data) {
      return 0
    }

    const { Total, Done, Plan } = data

    if (Total) {
      return (Done * 2 + Plan) / (Total * 2) * 100
    }

    return 0
  }

  getSkillsetProgress () {
    const skillsetId = this.skillsetId

    if (skillsetId) {
      ajax
        .get(`activity/skillset/${skillsetId}`)
        .then(({ data }) => {
          this.setState({
            skillset: data,
          })
        })
    }
  }

  getSkillProgress () {
    const { skill } = this.state
    const { skillId } = this.props.match.params

    if (skillId && !skill[skillId as never]) {
      ajax
        .get(`activity/skill/${skillId}`)
        .then(({ data }) => {
          this.setState({
            skill: {
              ...skill,
              [skillId]: data,
            },
          })
        })
    }
  }

  render () {
    const status: number = this.status

    return (
      <>
        <div className={s.UserProgress}>
          <div className={s.UserProgress__label}>
            Your progress:
          </div>
          <div className={s.UserProgress__bar}>
            <div
              className={cn(s.UserProgress__status, {
                [s.UserProgress__status_bad]: status < 30,
                [s.UserProgress__status_good]: status > 70,
              })}
              style={{
                width: `${status}%`
              }}
            >
              <div className={s.UserProgress__value}>
                {Math.floor(status)}%
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default compose(
  withRouter,
  withUser,
  connect(
    ({ resources }: RootState) => ({
      resources
    })
  )
)(UserProgress)
