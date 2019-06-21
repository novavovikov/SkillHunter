import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Profession, SkillSet, Steps } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationProps } from '../../providers/Notification/context'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { ProfessionType } from '../../types'
import { Layout, Logo } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  user: UserState
  setProfessions: (data: ProfessionType[]) => void,
  notificationApi: NotificationProps
}

class Introduction extends React.Component<Props> {
  state = {
    profession: '',
    skills: [],
  }

  setProfession = (profession: string) => {
    this.setState({ profession })
  }

  setSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    const { history, setProfessions, notificationApi } = this.props

    ajax.
      post('user/profession', this.state).
      then(({ data }) => {
        setProfessions(data as ProfessionType[])
        history.push(ROUTES.HOME)
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
          initStep="Profession"
          steps={[
            {
              label: '1. Specialty',
              id: 'Profession',
            },
            {
              label: '2. SkillSet',
              id: 'Skills',
            },
          ]}
        >
          <Steps.Content id={'Profession'}>
            <Profession onSubmit={this.setProfession}/>
          </Steps.Content>
          <Steps.Content id={'Skills'}>
            <SkillSet onSubmit={this.setSkills}/>
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
      setProfessions: (professions: ProfessionType[]) => updateUserData({ professions }),
    },
  ),
)(Introduction)
