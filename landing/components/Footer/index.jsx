import { withNamespaces } from '../../i18n'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  AGREEMENT_ROUTE,
  COOKIE_ROUTE,
} from '../../constants/routes'

import css from './Footer.scss'

const Footer = ({ t }) => {
  const [visibility, setVisibility] = useState(false)

  const checkWindowPosition = () => {
    setVisibility(window.scrollY > 60)
  }

  useEffect(() => {
    checkWindowPosition()
    window.addEventListener('scroll', checkWindowPosition)
    return () => window.removeEventListener('scroll', checkWindowPosition)
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
        <div className={css.Footer__copyright}>
          © 2019 SkillHunter | <a
          className={`${css.Footer__link} ${css.Footer__link_mail}`}
          href="mailto:help@skillhunter.io"
        >help@skillhunter.io</a>
        </div>

        <div className={css.Footer__links}>
          <Link href={COOKIE_ROUTE}>
            <a className={css.Footer__link}>
              {t('cookie')}
            </a>
          </Link>
          <a
            href="/static/files/privacy_policy.pdf"
            className={css.Footer__link}
            target="_blank"
          >
            {t('privacy')}
          </a>
          <Link href={AGREEMENT_ROUTE}>
            <a className={css.Footer__link}>
              {t('agreement')}
            </a>
          </Link>
        </div>

        {visibility && (
          <button
            className={css.Footer__scrolltop}
            onClick={handleScrollTop}
          >
            {t('up')}
          </button>
        )}
      </div>
    </footer>
  )
}

export default withNamespaces('footer')(Footer)
