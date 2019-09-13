import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { ISkillset, IUser } from '../../types'
import { Layout } from '../../UI'
import { Nav, SkillCreator, UserSkillset, UserProgress } from '../index'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  className?: string
  user: UserState
  onClose: () => void
}

class Sidebar extends Component<Props> {
  getSkillsetId = (skillset: string, userData: IUser) => {
    const selectedSkillset = userData.skillsets.find(({ name }: ISkillset) => name === skillset)

    if (selectedSkillset) {
      return selectedSkillset.id
    }

    return null
  }

  render () {
    const { user, match, className, onClose } = this.props

    return (
      <Layout.Aside className={className}>
        {user && (
          <>
            <UserProgress/>
            <UserSkillset onChange={onClose}/>
            <Nav/>
            <SkillCreator
              skillsetId={this.getSkillsetId(
                match.params.skillset,
                user,
              )}
            />
          </>
        )}
      </Layout.Aside>
    )
  }
}

export default compose<any>(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(Sidebar)
