import Link from 'next/link'
import Container from '../Container'
import Button from '../Button'
import { REGISTRATION_ROUTE } from '../../constants/routes'

import css from './Banner.scss'

export default () => (
  <Container>
    <div className={css.Banner}>
      <div className={css.Banner__content}>
        <h1>
          Новый легкий и лучший способ саморазвития (скоро)
        </h1>
        <div className={css.Banner__text}>
          <div>
            Платформа для развития профессиональных и личных навыков
          </div>

          <Link href={REGISTRATION_ROUTE}>
            <Button className={css.Banner__btn}>
              Начать
            </Button>
          </Link>
        </div>
      </div>

      <div className={css.Banner__img}>
        <img
          src="/static/undraw_investing_7u7.png"
          alt=""
        />
      </div>
    </div>
  </Container>
)