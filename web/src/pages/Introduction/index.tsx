import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, SkillStep, SkillsetStep, Steps } from '../../components'
import { ENotifications } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { addNotification } from '../../redux/actions/notifications'
import { updateUserData } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { INotification, ISkillset } from '../../types'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'

interface Props extends RouteComponentProps {
  user: UserState
  setSkillsets: (data: ISkillset[]) => void,
  showNotification: (data: INotification) => void
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
    console.log(123, window.gtag)
    analytics({
      event: 'click_improve_btn',
      skillset
    })
  }

  setSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    const { history, setSkillsets, showNotification } = this.props

    ajax.
      post('user/skillset', this.state).
      then(({ data }) => {
        setSkillsets(data as ISkillset[])
        history.push(`${ROUTES.SKILLSET}/${this.state.skillset}`)
      }).
      catch(e => {
        if (e.response && e.response.status < 500) {
          return (
            showNotification({
              message: e.response.data.message,
              type: ENotifications.error,
            })
          )
        }

        showNotification({
          message: 'System error. Try again.',
          type: ENotifications.error,
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
          steps={['Skillset', 'Skills']}
        >
          <Steps.Content id={'Skillset'}>
            <SkillsetStep onSubmit={this.setSkillset}/>
          </Steps.Content>
          <Steps.Content id={'Skills'}>
            <SkillStep onSubmit={this.setSkills}/>
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
      setSkillsets: (skillsets: ISkillset[]) => updateUserData({ skillsets }),
      showNotification: addNotification,
    },
  ),
)(Introduction)
