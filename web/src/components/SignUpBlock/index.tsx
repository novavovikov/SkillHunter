import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { H2 } from '../../UI'
import step1 from './icons/step-1.svg'
import step2 from './icons/step-2.svg'
import step3 from './icons/step-3.svg'
import step4 from './icons/step-4.svg'
import step5 from './icons/step-5.svg'
import * as s from './SignUpBlock.css'

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

const SignUpBlock: FC = () => {
  return (
    <div className={s.SignUpBlock}>
      <H2 className={s.SignUpBlock__title}>
        Sign up to
      </H2>

      <div className={s.SignUpBlock__items}>
        {STEPS.map(({ title, label, icon }) => (
          <div
            key={title}
            className={s.SignUpBlock__item}
          >
            <div className={s.SignUpBlock__itemIcon}>
              <img
                src={icon}
                alt={label}
              />
            </div>
            <div className={s.SignUpBlock__itemTitle}>
              {title}
            </div>
            <div>
              {label}
            </div>
          </div>
        ))}
      </div>

      <Link
        to={ROUTES.INTRODUCTION}
        className={s.SignUpBlock__submit}
      >
        Start
        <span className={s.SignUpBlock__submitLabel}>
          improve skills
        </span>
      </Link>
    </div>
  )
}

export default SignUpBlock
