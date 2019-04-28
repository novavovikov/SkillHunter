import { withNamespaces } from '../../i18n'
import { useEffect } from 'react'
import Link from 'next/link'
import Typed from 'typed.js'
import Container from '../Container'
import Button from '../Button'
import { REGISTRATION_ROUTE } from '../../constants/routes'

import css from './Banner.scss'

const Banner = ({ t }) => {
  useEffect(() => {
    const options = {
      strings: [
        `${t('light')}`,
        '',
        `${t('best')}`,
        '',
        `${t('promo-text')}<span class="title-label">(${t('soon')})</span>`,
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
              {t('description')}
            </p>

            <Link href={REGISTRATION_ROUTE}>
              <a>
                <Button
                  span
                  theme="lg"
                  className={css.Banner__btn}
                >
                  {t('common:start')}
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className={css.Banner__img}>
          <img
            src="/static/images/undraw_investing_7u7.png"
            alt=""
          />
        </div>
      </div>
    </Container>
  )
}

export default withNamespaces('banner')(Banner)
