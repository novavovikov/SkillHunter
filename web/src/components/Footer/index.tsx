import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../UI'
import { ROUTES } from '../../constants/routing'
import * as s from './Footer.css'

const LINKS = [
  {
    href: ROUTES.COOKIE,
    label: 'Cookies'
  },
  {
    href: ROUTES.TOS,
    label: 'Terms of Service'
  }
]

const Footer: FC = () => {
  const handleLink = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Layout.Footer>
      <div className={s.Footer}>
        <div className={s.Footer__copyright}>
          <span className={s.Footer__copyrightText}>© 2019 SkillHunter</span> | <a
          href="mailto:help@skillhunter.io"
          className={s.Footer__link}>help@skillhunter.io</a>
        </div>

        <div>
          <a
            href="https://skillhunter.io/static/files/privacy_policy_en.pdf"
            className={s.Footer__link}
            target="_blank"
          >
            Privacy Policy
          </a>

          {LINKS.map(({ href, label }, index) => (
            <Link
              key={index}
              to={href}
              className={s.Footer__link}
              onClick={handleLink}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </Layout.Footer>
  )
}

export default Footer
