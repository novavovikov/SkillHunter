import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typed from 'typed.js'
import notFoundImg from './images/not-found.svg'
import { ROUTES } from '../../constants/routing'
import { analytics } from '../../utils/analytics'
import * as s from './NotFound.css'

const NotFound: FC = () => {
  useEffect(() => {
    analytics({
      event: '404',
      category: 'error',
    })

    const
      options = {
        strings: [
          `Page not found`,
        ],
        typeSpeed: 50,
        backSpeed: 40,
      }

    const
      typedText = new Typed('[data-typed]', options)

    return () => typedText.destroy()
  })

  return (
    <div className={s.NotFound}>
      <div className={s.NotFound__img}>
        <img src={notFoundImg} alt=""/>
      </div>
      <div className={s.NotFound__title}>
        <span data-typed=""/>
      </div>
      <div className={s.NotFound__subtitle}>
        404
      </div>

      <Link
        to={ROUTES.INTRODUCTION}
        className={s.NotFound__submit}
      >
        Create
        <span className={s.NotFound__submitLabel}>
        skillset
      </span>
      </Link>

      <div className={s.NotFound__label}>
        or
      </div>

      <Link
        to={ROUTES.HOME}
        className={s.NotFound__link}
      >
        Go to home page
      </Link>
    </div>
  )
}

export default NotFound
