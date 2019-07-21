import React, { useEffect } from 'react'
import Link from 'next/link'
import Typed from 'typed.js'
import { withNamespaces } from '../../i18n'
import { HOME_ROUTE } from '../../constants/routes'
import Container from '../Container'
import Button from '../../UI/Button'
import css from './Error.scss'

const Error = ({ i18n, lng, t, statusCode }) => {
  const getContent = () => {
    try {
      return i18n.store.data[lng].error[statusCode] ||
        i18n.store.data[lng].error[404] ||
        {}
    } catch (e) {
      return {}
    }
  }

  const content = getContent()

  useEffect(() => {
    const options = {
      strings: [
        String(content.status),
        String(content.code),
      ],
      typeSpeed: 50,
      backSpeed: 40,
      showCursor: false,
    }

    const typedText = new Typed('[data-typed]', options)

    return () => typedText.destroy()
  })

  return (
    <Container>
      <div className={css.Error}>
        <div className={css.Error__statusCode}>
          <span data-typed=''/>
        </div>

        <img
          className={css.Error__img}
          src="/static/images/404.svg"
          alt=""
        />

        <div className={css.Error__status}>
          {content.status}
        </div>

        <div className={css.Error__description}>
          {content.description}
        </div>

        <Link href={HOME_ROUTE}>
          <Button span>
            {t('button')}
          </Button>
        </Link>
      </div>
    </Container>
  )
}

export default withNamespaces('error')(Error)
