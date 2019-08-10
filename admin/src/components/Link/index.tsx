import React, { FC } from 'react'
import cn from 'classnames'
import { Link, LinkProps } from 'react-router-dom'
import * as  s from './Link.css'

interface Props extends LinkProps{
  className?: string
}

const ExternalLink: FC<Props> =  ({ className, ...rest }) => {
  return (
    <Link
      className={cn(s.Link, className)}
      {...rest}
    />
  )
}

export default ExternalLink
