import * as React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import logo from './icons/logo.svg'
import * as s from './Logo.css'

interface Props {
  className?: string
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      to={'/'}
      className={cn(s.Logo, className)}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}

export default Logo
