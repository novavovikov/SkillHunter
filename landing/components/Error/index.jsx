import React, { useEffect } from 'react'
import Link from 'next/link'
import Typed from 'typed.js'
import { HOME_ROUTE } from '../../constants/routes'
import Container from '../Container'
import Button from '../Button'
import css from './Error.scss'

const Error = () => {
  useEffect(() => {
    const options = {
      strings: [
        String('Page not found'),
        String(404),
      ],
      typeSpeed: 50,
      backSpeed: 40,
      showCursor: false,
    }

    const typedText = new Typed('[data-typed]', options)

    return () => typedText.destroy()
  })

  return (
    <div className={css.Error}>
      <Container>
        <div className={css.Error__statusCode}>
          <span data-typed=''/>
        </div>

        <img
          className={css.Error__img}
          src="/static/images/404.svg"
          alt=""
        />

        <div className={css.Error__status}>
          Page not found
        </div>

        <div className={css.Error__description}>
          The page you are looking for can't be found.
          You can look for it on the main page
        </div>

        <Link href={HOME_ROUTE}>
          <Button span>
            To main page
          </Button>
        </Link>
      </Container>
    </div>
  )
}

export default Error
