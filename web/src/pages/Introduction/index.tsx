import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import linkGif from './images/link.gif'
import importantGif from './images/important.gif'
import focusGif from './images/focus.gif'
import { Onboarding, Page, SkillsetStep, SkillStep } from '../../components'
import { Steps, Mark } from '../../UI'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { addSkillsetSaga } from '../../redux/actions/skillset'
import { addUserSkillsetSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { ISkillset, IUser } from '../../types'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import * as s from './Introduction.css'

enum ESteps {
  skillset,
  skills,
  onBoardingLink,
  onBoardingImportant,
  onBoardingFocus,
}

interface Props extends RouteComponentProps {
  user: IUser
  addSkillset: (data: [Partial<ISkillset>]) => void,
  addUserSkillset: (
    skillset: string,
    skills: string[],
    callback: () => void
  ) => void
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
    ajax.get(`${API.SKILLSET}/landing`).then(({ data }) => {
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
    const { addUserSkillset, history, user } = this.props
    const { skillset } = this.state

    addUserSkillset(skillset, skills, () => {
      user.skillsets.length
        ? history.push(`${ROUTES.LIBRARY}/${skillset}`)
        : this.setActiveStep(ESteps.onBoardingLink)
    })
  }

  submitOnBoardingLink = () => {
    this.setActiveStep(ESteps.onBoardingImportant)
  }

  submitOnBoardingImportant = () => {
    this.setActiveStep(ESteps.onBoardingFocus)
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
          <Steps.Content id={ESteps.onBoardingLink}>
            <Onboarding
              img={linkGif}
              onCancel={this.submitOnBoarding}
              onSubmit={this.submitOnBoardingLink}
            >
              Useful <Mark>is no longer lost</Mark> in chat history and bookmarks
            </Onboarding>
          </Steps.Content>
          <Steps.Content id={ESteps.onBoardingImportant}>
            <Onboarding
              img={importantGif}
              onCancel={this.submitOnBoarding}
              onSubmit={this.submitOnBoardingImportant}
            >
              You <Mark>study only</Mark> what is <Mark>important now</Mark>
            </Onboarding>
          </Steps.Content>
          <Steps.Content id={ESteps.onBoardingFocus}>
            <Onboarding
              img={focusGif}
              onSubmit={this.submitOnBoarding}
            >
              <Mark>Focus on</Mark> resource what you haven't learned yet
            </Onboarding>
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
