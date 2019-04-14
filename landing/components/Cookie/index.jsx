import { withNamespaces } from '../../i18n'
import { useState } from 'react'
import Link from 'next/link'
import Button from '../Button'
import { COOKIE_ROUTE } from '../../constants/routes'
import css from './Cookie.scss'

const Cookie = ({ t }) => {
  const [isAccepted, acceptAggrement] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    acceptAggrement(true)
    localStorage.setItem('cookie', 'done')
  }

  if (isAccepted || localStorage.getItem('cookie')) {
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
