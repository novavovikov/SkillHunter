import cn from 'classnames'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import { REGISTRATION_ROUTE } from '../../constants/routes'

import css from './Promo.scss'

const Promo = ({ t }) => (
  <div className={css.Promo}>
    <Container>
      <div className={css.Promo__content}>
        <img
          className={css.Promo__img}
          src="/static/images/undraw_live_collaboration_2r4y.svg"
          alt=""
        />
        <div className={cn('h1', css.Promo__title)}>
          {t('title')}
        </div>

        <div className={css.Promo__text}>
          {t('text')}
        </div>

        <Link href={REGISTRATION_ROUTE}>
          <a>
            <Button
              span
              theme="lg"
            >
              {t('common:start')}
            </Button>
          </a>
        </Link>
      </div>
    </Container>
  </div>
)

export default withNamespaces(['promo'])(Promo)
