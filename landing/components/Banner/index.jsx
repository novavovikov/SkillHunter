import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Container from '../Container'

import s from './Banner.scss'
import { REGISTRATION_ROUTE } from '../../constants/routes'

const Banner = () => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const options = {
      strings: [
        `Create your skillset and improve it`,
      ],
      typeSpeed: 50,
      backSpeed: 40,
    }

    const typedText = new Typed('[data-typed]', options)

    return () => typedText.destroy()
  })

  return (
    <form
      className={s.Banner}
      onSubmit={(e) => {
        e.preventDefault()
        window.location.href = REGISTRATION_ROUTE
      }}
    >
      <Container>
        <h1>
            <span data-typed=''/>
          </h1>

        <Input
          className={s.Banner__input}
          placeholder="Enter your skillset (speciality, profession or hobby)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className={s.Banner__footer}>
          <Button theme="large" disabled={!inputValue}>
            Improve
            <span className={s.Banner__label}>
              your skills
              </span>
          </Button>
        </div>

        <div className={s.Banner__description}>
          <h5 className={s.Banner__subtitle}>
            Skillhunter help you
          </h5>
          <div>
            self-development, collecting and share your source for your skills
          </div>
        </div>
      </Container>
    </form>
  )
}

export default Banner
