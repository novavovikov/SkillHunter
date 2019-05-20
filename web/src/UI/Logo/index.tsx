import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from './icons/logo.svg'
import * as s from './Logo.css'

const Logo: React.FC = () => {
  return (
    <Link
      to={'/'}
      className={s.Logo}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}

export default Logo
