import { withNamespaces } from '../../i18n'
import Link from 'next/link'
import Container from '../../components/Container'
import { AGREEMENT_ROUTE, COOKIE_ROUTE } from '../../constants/routes'

import css from './Footer.scss'

const Footer = ({ t, lng }) => {
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
                {t('cookie')}
              </a>
            </Link>
            <a
              href={`/static/files/privacy_policy_${lng}.pdf`}
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
        </div>
      </Container>
    </footer>
  )
}

export default withNamespaces('footer')(Footer)
