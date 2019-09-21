import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { IActivityByResources, IUser } from '../../types'
import * as s from './UserProgress.css'
import { RouteComponentProps, withRouter } from 'react-router'
import { withUser } from '../../providers/User'
import { ActivityState } from '../../redux/reducers/activity'
import { getSkillActivitySaga, getSkillsetActivitySaga } from '../../redux/actions/activity'
import { ResourcesState } from '../../redux/reducers/resources'

interface Params {
  skillId: string
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: IUser
  activity: ActivityState
  resources: ResourcesState
  getSkillsetActivity: (skillsetId: number) => void
  getSkillActivity: (skillId: number) => void
}

class UserProgress extends Component<Props> {
  componentDidMount (): void {
    this.getSkillsetProgress()
    this.getSkillProgress()
  }

  componentDidUpdate ({ match, resources }: Props): void {
    if (JSON.stringify(resources) !== JSON.stringify(this.props.resources)) {
      this.getSkillsetProgress()
      this.getSkillProgress()
    }
  }

  get status () {
    const { activity, match } = this.props
    const { skillId } = match.params
    const skillData = activity.skill[skillId]

    if (skillData) {
      return this.calculateProgress(skillData)
    }

    if (activity.skillset) {
      return this.calculateProgress(activity.skillset)
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

  calculateProgress = (data: IActivityByResources | null) => {
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
    const { getSkillsetActivity, match } = this.props

    if (match.params.skillId) {
      return
    }

    const skillsetId = this.skillsetId

    if (skillsetId) {
      getSkillsetActivity(skillsetId)
    }
  }

  getSkillProgress () {
    const { getSkillActivity, match } = this.props
    const { skillId } = match.params

    if (skillId) {
      getSkillActivity(Number(skillId))
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
    ({ activity, resources }: RootState) => ({
      activity,
      resources
    }),
    {
      getSkillsetActivity: getSkillsetActivitySaga,
      getSkillActivity: getSkillActivitySaga,
    },
  )
)(UserProgress)
