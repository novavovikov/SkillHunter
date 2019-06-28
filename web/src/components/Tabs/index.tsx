import cn from 'classnames'
import React, { FC } from 'react'
import H2 from '../../UI/H2'
import * as s from './Tabs.css'

interface Control {
  label: string | number
  id: string
}

interface Props {
  controls: Control[]
}

const Tabs: FC<Props> = (
  {
    controls,
  },
) => {
  const [activeIndex, setActiveIndex] = React.useState('1')

  return (
    <div className={s.Tabs}>
      <div className={s.Tabs__controls}>
        {controls.map(({ id, label }) => (
          <button
            key={id}
            className={cn(s.Tabs__control, {
              [s.Tabs__control_active]: id === activeIndex,
            })}
            onClick={() => setActiveIndex(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <H2>Кто вы сейчас или кем хотите стать?</H2>
    </div>
  )
}

export default Tabs
