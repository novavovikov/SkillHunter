import { useEffect } from 'react'
import Link from 'next/link'
import Typed from 'typed.js'
import Container from '../Container'
import Button from '../Button'
import { REGISTRATION_ROUTE } from '../../constants/routes'

import css from './Banner.scss'

export default () => {
  useEffect(() => {
    const options = {
      strings: [
        'Новый легкий',
        '',
        'Новый лучший',
        '',
        'Новый легкий и лучший способ саморазвития<span class="title-label">(скоро)</span>',
      ],
      typeSpeed: 50,
      backSpeed: 40,
    }

    const typedText = new Typed('[data-typed]', options)

    return () => typedText.destroy()
  })

  return (
    <Container>
      <div className={css.Banner}>
        <div className={css.Banner__content}>
          <h1 className={css.Banner__title}>
            <span data-typed=''/>
          </h1>
          <div className={css.Banner__text}>
            <p className={css.Banner__description}>
              Платформа для развития профессиональных и личных навыков
            </p>

            <Link href={REGISTRATION_ROUTE}>
              <a>
                <Button
                  span
                  theme="lg"
                  className={css.Banner__btn}
                >
                  Начать
                </Button>
              </a>
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
}
