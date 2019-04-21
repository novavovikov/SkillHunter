import { withNamespaces } from '../../i18n'
import css from './Final.scss'
import Container from '../Container'

const Final = ({ t }) => (
  <div className={css.Final}>
    <Container>
      <img
        className={css.Final__img}
        src="/static/images/undraw_a_whole_year_.png"
        alt=""
      />

      <div className={css.Final__title}>{t('thanks')}</div>
      <div className={css.Final__text}>{t('text')}</div>
    </Container>
  </div>
)

export default withNamespaces('final')(Final)
