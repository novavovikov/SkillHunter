import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../UI'
import { ROUTES } from '../../constants/routing'
import { analytics } from '../../utils/analytics'
import * as s from './Footer.css'

const EXTERNAL_LINKS = [
  {
    href: 'https://www.patreon.com/sh_official',
    label: 'Donate'
  },
  {
    href: 'https://skillhunter.io/static/files/privacy_policy_en.pdf',
    label: 'Privacy Policy'
  }
]

const INTERNAL_LINKS = [
  {
    href: ROUTES.COOKIE,
    label: 'Cookies'
  },
  {
    href: ROUTES.TOS,
    label: 'Terms of Service'
  }
]

class Footer extends Component {
  handleInternalLink = () => {
    window.scrollTo(0, 0)
  }

  handleExternalLink = (e: any) => {
    analytics({
      event: 'click_external_link',
      link: e.target.href
    })
  }

  render () {
    return (
      <Layout.Footer>
        <div className={s.Footer}>
          <div className={s.Footer__copyright}>
            <span className={s.Footer__copyrightText}>© 2019 SkillHunter</span> | <a
            href="mailto:help@skillhunter.io"
            className={s.Footer__link}>help@skillhunter.io</a>
          </div>

          <div>
            {EXTERNAL_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className={s.Footer__link}
                target="_blank"
                onClick={this.handleExternalLink}
              >
                {label}
              </a>
            ))}

            {INTERNAL_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                to={href}
                className={s.Footer__link}
                onClick={this.handleInternalLink}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Layout.Footer>
    )
  }
}

export default Footer
