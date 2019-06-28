import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import logoPath from './icons/logo.svg'
import * as s from './Logo.css'

interface Props {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      to={'/'}
      className={cn(s.Logo, className)}
    >
      <img
        src={logoPath}
        alt=""
      />
    </Link>
  )
}

export default Logo
