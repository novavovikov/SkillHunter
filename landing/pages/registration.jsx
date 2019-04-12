import Page from '../components/Page'
import Container from '../components/Container'
import Registration from '../components/Registration'

export default () => (
  <Page
    header={{ withRegistration: false }}
    head={{
      title: 'Регистрация на SkillHunter'
    }}
  >
    <Container>
      <Registration/>
    </Container>
  </Page>
)
