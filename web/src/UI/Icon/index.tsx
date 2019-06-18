import cn from 'classnames'
import * as React from 'react'
import * as s from './Icon.css'

interface Props {
  type: string
}

const Icon: React.FC<Props> = ({ type }) => {
  return (
    <i
      className={cn(s.Icon, {
        [s.Icon__share]: type === 'share',
        [s.Icon__heart]: type === 'heart',
        [s.Icon__heartFilled]: type === 'heart-filled',
      })}
    />
  )
}

export default Icon
