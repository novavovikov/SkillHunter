import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Container, Profession, SkillSet, Steps } from '../../components'
import { ROUTES } from '../../constants/routing'
import { UserState } from '../../redux/reducers/user'
import { Logo } from '../../UI'

interface Props {
  user: UserState
}

class Introduction extends React.Component<Props> {
  render () {
    const { user } = this.props

    if (user.data.professions.length && user.data.skills.length) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <>
        <Container>
          <Logo/>
        </Container>

        <Steps.Wrap
          initStep={
            user.data.professions.length
              ? 'Skills'
              : 'Profession'
          }
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
            <Profession/>
          </Steps.Content>
          <Steps.Content id={'Skills'}>
            <SkillSet/>
          </Steps.Content>
        </Steps.Wrap>
      </>
    )
  }
}

export default connect(
  (state: any) => ({
    user: state.user,
  }),
)(Introduction)
