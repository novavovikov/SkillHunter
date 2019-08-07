import cn from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import logo from './icons/logo.svg?inline'
import * as s from './Logo.css'

interface Props {
  className?: string
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <Link
      to={'/'}
      className={cn(s.Logo, className)}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}

export default Logo
