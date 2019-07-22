import Link from 'next/link'
import Container from '../../components/Container'
import { AGREEMENT_ROUTE, COOKIE_ROUTE } from '../../constants/routes'

import css from './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <Container>
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
                Cookies
              </a>
            </Link>
            <a
              href={`/static/files/privacy_policy_en.pdf`}
              className={css.Footer__link}
              target="_blank"
            >
              Privacy Policy
            </a>
            <Link href={AGREEMENT_ROUTE}>
              <a className={css.Footer__link}>
                Terms of Service
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
