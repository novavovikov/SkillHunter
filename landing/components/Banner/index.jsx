import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import SkillsetForm from '../SkillsetForm'
import Container from '../Container'

import s from './Banner.scss'
import { APP_ROUTE } from '../../constants/routes'

const Banner = () => {
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
    <div className={s.Banner}>
      <Container>
        <h1 className={s.Banner__title}>
          <span data-typed=''/>
        </h1>

        <SkillsetForm/>

        <div className={s.Banner__description}>
          <h5 className={s.Banner__subtitle}>
            Skillhunter help you
          </h5>
          <div>
            self-development, collecting and share your source for your skills
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Banner
