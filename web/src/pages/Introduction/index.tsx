import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Onboarding, Page, SkillsetStep, SkillStep } from '../../components'
import { Steps } from '../../UI'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { addSkillsetSaga } from '../../redux/actions/skillset'
import { addUserSkillsetSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { ISkillset } from '../../types'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import * as s from './Introduction.css'

enum ESteps {
  skillset,
  skills,
  onboarding
}

interface Props extends RouteComponentProps {
  user: UserState
  addSkillset: (data: [Partial<ISkillset>]) => void,
  addUserSkillset: (skillset: string, skills: string[]) => void
}

interface State {
  activeStep: ESteps
  skillset: string
  skills: string[]
}

class Introduction extends React.Component<Props, State> {
  state = {
    activeStep: ESteps.skillset,
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

  setActiveStep = (activeStep: ESteps) => {
    this.setState({ activeStep })
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

    this.setActiveStep(ESteps.skills)
  }

  submitSkills = (skills: string[]) => {
    const { skillset } = this.state
    const { addUserSkillset } = this.props

    addUserSkillset(skillset, skills)
    this.setActiveStep(ESteps.onboarding)
  }

  submitOnBoarding = () => {
    const { history } = this.props
    const { skillset } = this.state

    history.push(`${ROUTES.LIBRARY}/${skillset}`)
  }

  cancelSkills = () => {
    this.setActiveStep(ESteps.skillset)
  }

  render () {
    const { skillset, activeStep } = this.state

    return (
      <Page
        sidebar={false}
        search={false}
        userMenu={false}
      >
        <Steps.Wrap
          activeStep={activeStep}
          className={s.Introduction}
        >
          <Steps.Content id={ESteps.skillset}>
            <SkillsetStep
              skillset={skillset}
              onChange={this.setSkillset}
              onSubmit={this.submitSkillset}
            />
          </Steps.Content>
          <Steps.Content id={ESteps.skills}>
            <SkillStep
              skillset={skillset}
              onCancel={this.cancelSkills}
              onSubmit={this.submitSkills}
            />
          </Steps.Content>
          <Steps.Content id={ESteps.onboarding}>
            <Onboarding onSubmit={this.submitOnBoarding}/>
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
