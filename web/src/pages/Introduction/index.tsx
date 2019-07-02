import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Skillset, SkillList, Steps } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationApiProps } from '../../providers/Notification/context'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { SkillsetType, SkillType } from '../../types'
import { Layout, Logo } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  user: UserState
  setSkillsets: (data: SkillsetType[]) => void,
  notificationApi: NotificationApiProps
}

interface State {
  skillset: string
  skills: string[]
}

class Introduction extends React.Component<Props, State> {
  state = {
    skillset: '',
    skills: [],
  }

  setSkillset = (skillset: string) => {
    this.setState({ skillset })
  }

  setSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    const { history, setSkillsets, notificationApi } = this.props

    ajax.
      post('user/skillset', this.state).
      then(({ data }) => {
        setSkillsets(data as SkillsetType[])
        history.push(`${ROUTES.SKILLSET}/${this.state.skillset}`)
      }).
      catch(e => {
        notificationApi.showNotification('System error. Try again.', NotificationTypes.error)
      })
  }

  render () {
    return (
      <>
        <Layout.Container>
          <Logo/>
        </Layout.Container>

        <Steps.Wrap
          initStep="Skillset"
          steps={[
            {
              label: '1. Skillset',
              id: 'Skillset',
            },
            {
              label: '2. Skills',
              id: 'Skills',
            },
          ]}
        >
          <Steps.Content id={'Skillset'}>
            <Skillset onSubmit={this.setSkillset}/>
          </Steps.Content>
          <Steps.Content id={'Skills'}>
            <SkillList onSubmit={this.setSkills}/>
          </Steps.Content>
        </Steps.Wrap>
      </>
    )
  }
}

export default compose(
  withRouter,
  withNotification,
  connect(
    ({ user }: RootState) => ({ user }),
    {
      setSkillsets: (skillsets: SkillsetType[]) => updateUserData({ skillsets }),
    },
  ),
)(Introduction)
