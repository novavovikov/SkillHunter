import * as React from 'react'
import info from './icons/info.svg'
import * as s from './Tip.css'

const Tip: React.FC = ({ children }) => {
  return (
    <div className={s.Tip}>
      <i
        className={s.Tip__icon}
        dangerouslySetInnerHTML={{ __html: info }}
      />
      { children }
    </div>
  )
}

export default Tip
