import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { SkillList, Skillset, Steps, Page } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { addNotification } from '../../redux/actions/notifications'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { NotificationType, SkillsetType } from '../../types'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  user: UserState
  setSkillsets: (data: SkillsetType[]) => void,
  showNotification: (data: NotificationType) => void
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
    const { history, setSkillsets, showNotification } = this.props

    ajax.
      post('user/skillset', this.state).
      then(({ data }) => {
        setSkillsets(data as SkillsetType[])
        history.push(`${ROUTES.SKILLSET}/${this.state.skillset}`)
      }).
      catch(e => {
        showNotification({
          message: 'System error. Try again.',
          type: NotificationTypes.error,
        })
      })
  }

  render () {
    return (
      <Page
        sidebar={false}
        search={false}
        userMenu={false}
      >
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
      </Page>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
    {
      setSkillsets: (skillsets: SkillsetType[]) => updateUserData({ skillsets }),
      showNotification: addNotification,
    },
  ),
)(Introduction)
