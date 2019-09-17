import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, SkillsetStep, SkillStep, Steps } from '../../components'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { addSkillsetSaga } from '../../redux/actions/skillset'
import { addUserSkillsetSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { ISkillset } from '../../types'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'

interface Props extends RouteComponentProps {
  user: UserState
  addSkillset: (data: [Partial<ISkillset>]) => void,
  addUserSkillset: (skillset: string, skills: string[], callback?: () => void) => void
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

  componentDidMount (): void {
    ajax.get(`${API.SKILLSET}/landing`).
      then(({ data }) => {
        this.setState({
          skillset: data || ''
        })
    })
  }

  setSkillset = (skillset: string) => {
    this.setState({ skillset })
  }

  submitSkillset = () => {
    const { skillset }: State = this.state
    const { addSkillset } = this.props

    addSkillset([{ name: skillset }])

    analytics({
      event: 'click_improve_btn',
      input_skillset: skillset,
      category: 'introduction_1'
    })
  }

  submitSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    const { skills, skillset } = this.state
    const { history, addUserSkillset } = this.props

    addUserSkillset(skillset, skills, () => history.push(`${ROUTES.LIBRARY}/${skillset}`))
  }

  render () {
    const { skillset } = this.state

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
            <SkillsetStep
              skillset={skillset}
              onChange={this.setSkillset}
              onSubmit={this.submitSkillset}
            />
          </Steps.Content>
          <Steps.Content id={'Skills'}>
            <SkillStep
              skillset={skillset}
              onSubmit={this.submitSkills}
            />
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
      addSkillset: addSkillsetSaga,
      addUserSkillset: addUserSkillsetSaga,
    },
  ),
)(Introduction)
