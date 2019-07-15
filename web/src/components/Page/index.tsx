import React, { Component } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { SkillsetType, UserType } from '../../types'
import { Layout } from '../../UI'
import { Header, Nav, SkillCreator, UserSkillset } from '../index'

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
        <Header/>

        <Layout.Content>
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

          <Layout.Main>
            <Scrollbar
              autoHeight
              autoHeightMax="100%"
              autoHide
            >
              <Layout.Data>
                {children}
              </Layout.Data>
            </Scrollbar>

            <Layout.Footer>
              Copyright ©2019 SkillHunter
            </Layout.Footer>
          </Layout.Main>
        </Layout.Content>
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
