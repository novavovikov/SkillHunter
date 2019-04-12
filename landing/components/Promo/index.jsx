import cn from 'classnames'

import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import { REGISTRATION_ROUTE } from '../../constants/routes'

import css from './Promo.scss'

export default () => (
  <div className={css.Promo}>
    <Container>
      <div className={css.Promo__content}>
        <div className={cn('h1', css.Promo__title)}>
          Начните развиваться уже сейчас
        </div>

        <div className={css.Promo__text}>
          Бесплатно, карта не требуется
        </div>

        <Link href={REGISTRATION_ROUTE}>
          <a>
            <Button
              span
              theme="large"
            >
              Начать
            </Button>
          </a>
        </Link>
      </div>
    </Container>
  </div>
)
