import React, { Component } from 'react'
import Link from 'next/link'
import Button from '../Button'
import { COOKIE_ROUTE } from '../../constants/routes'
import css from './Cookie.scss'

class Cookie extends Component {
  state = {
    isAccepted: true,
  }

  componentDidMount = () => {
    const { isAccepted } = this.state

    if (isAccepted && !localStorage.getItem('cookie')) {
      this.acceptAgreement(false)
    }
  }

  acceptAgreement = (isAccepted) => {
    this.setState({ isAccepted })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.acceptAgreement(true)
    localStorage.setItem('cookie', 'true')
  }

  render () {
    const { isAccepted } = this.state

    if (isAccepted) {
      return null
    }

    return (
      <form
        className={css.Cookie}
        onSubmit={this.onSubmit}
      >
        <div className={css.Cookie__text}>We use <Link href={COOKIE_ROUTE}
        ><a className={css.Cookie__link}>cookies</a>
        </Link>
        </div>

        <Button theme="xs blue">
          Accept
        </Button>
      </form>
    )
  }
}

export default Cookie
