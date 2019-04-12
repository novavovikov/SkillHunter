import Page from '../components/Page'
import Final from '../components/Final'

export default () => (
  <Page
    recommendation
    head={{
      title: 'Спасибо'
    }}
    header={{
      withRegistration: false,
    }}
  >
    <Final/>
  </Page>
)
