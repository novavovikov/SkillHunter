import React, { FC } from 'react'
import cn from 'classnames'
import * as s from './Loader.css'

interface Props {
  size?: 's' | 'm' | 'l'
}

const Loader: FC<Props> = ({ size }) => (
  <div className={cn(s.Loader, {
    [s.Loader_s]: size === 's'
  })}>
    <i className={cn(s.Loader__line, s.Loader__line_blue)}/>
    <i className={cn(s.Loader__line, s.Loader__line__orange)}/>
    <i className={cn(s.Loader__line, s.Loader__line_green)}/>
  </div>
)

export default Loader
