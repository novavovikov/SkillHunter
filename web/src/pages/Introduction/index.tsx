import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, SkillsetStep, SkillStep, Steps } from '../../components'
import { ROUTES } from '../../constants/routing'
import { addSkillsetSaga } from '../../redux/actions/skillset'
import { addUserSkillsetSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { ISkillset } from '../../types'
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

  setSkillset = (skillset: string) => {
    const { addSkillset } = this.props
    this.setState({ skillset })

    addSkillset([{ name: skillset }])

    analytics({
      event: 'click_improve_btn',
      input_skillset: skillset,
      category: 'introduction_1'
    })
  }

  setSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    const { skills, skillset } = this.state
    const { history, addUserSkillset } = this.props

    addUserSkillset(skillset, skills, () => history.push(`${ROUTES.SKILLSET}/${skillset}`))
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
      addSkillset: addSkillsetSaga,
      addUserSkillset: addUserSkillsetSaga,
    },
  ),
)(Introduction)
