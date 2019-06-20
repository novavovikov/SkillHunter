import * as React from 'react'
import cn from 'classnames'
import * as s from './Loader.css'

const Loader: React.FC = () => (
  <div className={s.Loader}>
    <i className={cn(s.Loader__line, s.Loader__line_blue)}/>
    <i className={cn(s.Loader__line, s.Loader__line__orange)}/>
    <i className={cn(s.Loader__line, s.Loader__line_green)}/>
  </div>
)

export default Loader
