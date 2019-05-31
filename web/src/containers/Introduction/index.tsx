import * as React from 'react'
import { connect } from 'react-redux'
import { Container, Profession, SkillSet, Steps } from '../../components'
import { UserState } from '../../redux/reducers/user'
import { Logo } from '../../UI'

interface Props {
  user: UserState
}

class Introduction extends React.Component<Props> {
  state = {
    profession: '',
    skills: []
  }

  setProfession = (profession: string) => {
    this.setState({ profession })
  }

  setSkills = (skills: string[]) => {
    this.setState({ skills }, this.onSubmit)
  }

  onSubmit = () => {
    console.log(this.state)
  }

  render () {
    return (
      <>
        <Container>
          <Logo/>
        </Container>

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

export default connect(
  (state: any) => ({
    user: state.user,
  }),
)(Introduction)
