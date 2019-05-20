import * as React from 'react'
import { Container, Steps, Profession, SkillSet } from '../../components'
import { Logo } from '../../UI'

const Introduction: React.FC = () => {
  return (
    <Container>
      <Logo/>
      <Steps.Wrap
        initStep={'Skills'}
        steps={[
          {
            label: '1. Специальность',
            id: 'Profession',
          },
          {
            label: '2. Скиллсет',
            id: 'Skills',
          },
          {
            label: '3. Материалы',
            id: 'Source',
          },
        ]}
      >
        <Steps.Content id={'Profession'}>
          <Profession/>
        </Steps.Content>
        <Steps.Content id={'Skills'}>
          <SkillSet/>
        </Steps.Content>
        <Steps.Content id={'Source'}>
          <Profession/>
        </Steps.Content>
      </Steps.Wrap>
    </Container>
  )
}

export default Introduction
