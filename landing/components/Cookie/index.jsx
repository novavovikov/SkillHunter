import { useState, useEffect } from 'react'
import { withNamespaces } from '../../i18n'
import Link from 'next/link'
import Button from '../Button'
import { COOKIE_ROUTE } from '../../constants/routes'
import css from './Cookie.scss'

const Cookie = ({ t }) => {
  const [isAccepted, acceptAgreement] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    acceptAgreement(true)
    localStorage.setItem('cookie', true)
  }

  useEffect(() => {
    if (!isAccepted && localStorage.getItem('cookie')) {
      acceptAgreement(true)
    }
  })

  if (isAccepted) {
    return null
  }

  return (
    <form
      className={css.Cookie}
      onSubmit={onSubmit}
    >
      <div className={css.Cookie__text}>{t('we use')} <Link href={COOKIE_ROUTE}
      ><a className={css.Cookie__link}>{t('cookie')}</a>
      </Link>
      </div>

      <Button
        theme="xs blue"
      >
        {t('common:agree')}
      </Button>
    </form>
  )
}

export default withNamespaces('cookie-block')(Cookie)
