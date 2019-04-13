import { useState } from 'react'
import Link from 'next/link'
import Button from '../Button'
import { COOKIE_ROUTE } from '../../constants/routes'
import css from './Cookie.scss'

export default () => {
  const [isAccepted, acceptAggrement] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    acceptAggrement(true)
  }

  if (isAccepted) {
    return null
  }

  return (
    <form
      className={css.Cookie}
      onSubmit={onSubmit}
    >
      <div className={css.Cookie__text}>Мы используем <Link href={COOKIE_ROUTE}
      ><a className={css.Cookie__link}>cookie-файлы</a>
      </Link>
      </div>

      <Button
        theme="xs blue"
      >
        Согласен
      </Button>
    </form>
  )
}
