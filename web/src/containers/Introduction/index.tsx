import * as React from 'react'
import { Container, Profession, SkillSet, Steps } from '../../components'
import { Logo } from '../../UI'

const Introduction: React.FC = () => {
  return (
    <>
      <Container>
        <Logo/>
      </Container>

      <Steps.Wrap
        initStep={'Profession'}
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

export default Introduction
