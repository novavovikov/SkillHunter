import React, { FC, useEffect } from 'react'
import Typed from 'typed.js'
import { H4, H2 } from '../../UI'
import s from './Banner.css'
import { SkillsetForm } from '../index'

const Banner: FC = () => {
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
      <H2 className={s.Banner__title}>
        <span data-typed=""/>
      </H2>

      <SkillsetForm/>

      <div className={s.Banner__description}>
        <H4 className={s.Banner__subtitle}>
          Skillhunter help you
        </H4>
        <div>
          self-development, collecting and share your source for your skills
        </div>
      </div>
    </div>
  )
}

export default Banner
