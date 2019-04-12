import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  AGREEMENT_ROUTE,
  COOKIE_ROUTE,
  PRIVACY_ROUTE,
} from '../../constants/routes'

import css from './Footer.scss'

export default () => {
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    setVisibility(window.innerHeight < document.body.clientHeight)
  })

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer>
      <div className={css.Footer}>
        <div className={css.Footer__section}>
          © 2019 SkillHunter | <a
          className={`${css.Footer__link} ${css.Footer__link_mail}`}
          href="mailto:help@skillhunter.io"
        >help@skillhunter.io</a>
        </div>

        <div className={css.Footer__section}>
          <Link href={COOKIE_ROUTE}>
            <a className={css.Footer__link}>
              Cookie-файлы
            </a>
          </Link>
          <Link href={PRIVACY_ROUTE}>
            <a className={css.Footer__link}>
              Политика конфеденциальности
            </a>
          </Link>
          <Link href={AGREEMENT_ROUTE}>
            <a className={css.Footer__link}>
              Согласие на обработку персональных данных
            </a>
          </Link>
        </div>

        <div className={css.Footer__section}>
          {visibility && (
            <button
              className={css.Footer__scrolltop}
              onClick={handleScrollTop}
            >
              Вверх
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
