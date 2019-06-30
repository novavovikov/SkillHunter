import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { SkillSet, SkillList, Steps } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationProps } from '../../providers/Notification/context'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { SkillSetType, SkillType } from '../../types'
import { Layout, Logo } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  user: UserState
  setSkillSets: (data: SkillSetType[]) => void,
  notificationApi: NotificationProps
}

interface State {
  profession: string
  skills: string[]
}

class Introduction extends React.Component<Props, State> {
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
    const { history, setSkillSets, notificationApi } = this.props

    ajax.
      post('user/profession', this.state).
      then(({ data }) => {
        setSkillSets(data as SkillSetType[])
        history.push(`${ROUTES.SKILL_SET}/${this.state.profession}`)
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
              label: '1. Skillset',
              id: 'Profession',
            },
            {
              label: '2. Skills',
              id: 'Skills',
            },
          ]}
        >
          <Steps.Content id={'Profession'}>
            <SkillSet onSubmit={this.setProfession}/>
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
      setSkillSets: (professions: SkillSetType[]) => updateUserData({ professions }),
    },
  ),
)(Introduction)
