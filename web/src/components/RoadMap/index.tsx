import React, { FC } from 'react'
import step1 from './icons/step-1.svg'
import step2 from './icons/step-2.svg'
import step3 from './icons/step-3.svg'
import step4 from './icons/step-4.svg'
import step5 from './icons/step-5.svg'
import * as s from './RoadMap.css'

const STEPS = [
  {
    icon: step1,
    title: 'Create skillset',
    label: 'we recommend skills for improve',
  },
  {
    icon: step2,
    title: 'Collect&share',
    label: 'your materials',
  },
  {
    icon: step3,
    title: 'Make plan',
    label: 'with mentors or yourself',
  },
  {
    icon: step4,
    title: 'Improve skills',
    label: 'achieve key results',
  },
  {
    icon: step5,
    title: 'Get a grade',
    label: 'after improve',
  },
]

const RoadMap: FC = () => {
  return (
    <div className={s.RoadMap}>
      {STEPS.map(({ title, label, icon }) => (
        <div
          key={title}
          className={s.RoadMap__item}
        >
          <div className={s.RoadMap__itemIcon}>
            <img
              src={icon}
              alt={label}
            />
          </div>
          <div className={s.RoadMap__itemTitle}>
            {title}
          </div>
          <div>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoadMap
