import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Profession, SkillSet, Steps } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationProps } from '../../providers/Notification/context'
import { setUserData } from '../../redux/actions/user'
import { UserState } from '../../redux/reducers/user'
import { Layout, Logo } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  user: UserState
  setUserData: (data: any) => void,
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
    const { history, setUserData, notificationApi } = this.props

    ajax.
      post('user/profession', this.state).
      then(({ data }) => {
        setUserData(data)
        history.push(ROUTES.LIBRARY)
      }).
      catch(e => {
        notificationApi.showNotification('Что-то пошло не так. Попробуй ещё раз', NotificationTypes.error)
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
              label: '1. Специальность',
              id: 'Profession',
            },
            {
              label: '2. Скиллсет',
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
    (state: any) => ({
      user: state.user,
    }),
    {
      setUserData,
    },
  ),
)(Introduction)
