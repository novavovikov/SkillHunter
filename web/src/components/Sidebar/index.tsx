import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { SkillsetType, UserType } from '../../types'
import { Layout } from '../../UI'
import { Nav, SkillCreator, UserSkillset } from '../index'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
}

class Sidebar extends Component<Props> {
  getSkillsetId = (skillset: string, userData: UserType) => {
    const selectedSkillset = userData.skillsets.find(({ name }: SkillsetType) => name === skillset)

    if (selectedSkillset) {
      return selectedSkillset.id
    }

    return null
  }

  render () {
    const { user, match } = this.props

    return (
      <Layout.Aside>
        {user.data && (
          <>
            <UserSkillset/>
            <Nav/>
            <SkillCreator
              skillsetId={this.getSkillsetId(
                match.params.skillset,
                user.data,
              )}
            />
          </>
        )}
      </Layout.Aside>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(Sidebar)
