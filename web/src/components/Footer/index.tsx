import React, { FC } from 'react'
import { Layout } from '../../UI'
import * as s from './Footer.css'

const LINKS = [
  {
    href: 'https://skillhunter.io/static/files/privacy_policy_en.pdf',
    label: 'Privacy Policy'
  },
  {
    href: 'https://skillhunter.io/cookie',
    label: 'Cookies'
  },
  {
    href: 'https://skillhunter.io/tos',
    label: 'Terms of Service'
  }
]

const Footer: FC = () => {
  return (
    <Layout.Footer>
      <div className={s.Footer}>
        <div className={s.Footer__copyright}>
          © 2019 SkillHunter | <a href="mailto:help@skillhunter.io" className={s.Footer__link}>help@skillhunter.io</a>
        </div>

        <div>
          {LINKS.map(({ href, label }, index) => (
            <a
              key={index}
              href={href}
              className={s.Footer__link}
              target="_blank"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

    </Layout.Footer>
  )
}

export default Footer
