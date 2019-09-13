import React, { Component } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { ResourcesState } from '../../redux/reducers/resources'
import { EResourceStatus } from '../../types'
import * as s from './UserProgress.css'

interface Props {
  resources: ResourcesState
}

class UserProgress extends Component<Props> {
  get status () {
    const { resources } = this.props

    const progress = Object.values(resources).reduce((acc, { total, data }) => {
      const resourcesWithDone = data.filter(({ status }) => status === EResourceStatus.Done)
      const resourcesWithPlan = data.filter(({ status }) => status === EResourceStatus.Plan)

      return {
        total: acc.total + total * 2,
        done: acc.done + resourcesWithPlan.length + resourcesWithDone.length * 2
      }
    }, {
      total: 0,
      done: 0
    })

    return progress.done / progress.total * 100
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
  connect(
    ({ resources }: RootState) => ({
      resources
    })
  )
)(UserProgress)
