import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { SkillsetType, UserType } from '../../types'
import { Layout, Logo } from '../../UI'
import { Header, Nav, SkillCreator, UserSkillset } from '../index'
import * as s from './Page.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
}

class Page extends Component<Props> {
  getSkillsetId = (skillset: string, userData: UserType) => {
    const selectedSkillset = userData.skillsets.find(({ name }: SkillsetType) => name === skillset)

    if (selectedSkillset) {
      return selectedSkillset.id
    }

    return null
  }

  render () {
    const { user, match, children } = this.props

    return (
      <Layout.Wrap>
        <Layout.Aside>
          <Logo className={s.Page__logo}/>

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

        <Layout.Content>
          <Header/>
          <Layout.Data>
            {children}
          </Layout.Data>
        </Layout.Content>

        <Layout.Footer>
          Copyright ©2019 skillhunter
        </Layout.Footer>
      </Layout.Wrap>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(Page)
