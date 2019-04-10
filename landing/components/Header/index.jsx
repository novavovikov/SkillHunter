import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import {
  HOME_ROUTE,
  REGISTRATION_ROUTE,
} from '../../constants/routes'

import css from './Header.scss'

export default ({ withRegistration = true }) => (
  <header className={css.Header}>
    <Container>
      <div className={css.Header__content}>
        <Link href={HOME_ROUTE}>
          <a>
            <img
              className={css.Header__logo}
              src="/static/skillhunter-logo.png"
              alt=""
            />
          </a>
        </Link>

        {withRegistration && (
          <Link href={REGISTRATION_ROUTE}>
            <Button theme="small">
              Начать
            </Button>
          </Link>
        )}
      </div>
    </Container>
  </header>
)