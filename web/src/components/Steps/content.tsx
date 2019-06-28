import React, { FC } from 'react'
import * as s from './Steps.css'

interface Props {
  children: any,
  id: string,
  activeStep?: string,
  setStep?: (id: string) => void
}

export const Content: FC<Props> = (
  {
    children,
    setStep,
  },
) => {
  return (
    <div className={s.Steps__content}>
      {React.Children.
        toArray(children).
        filter(child => React.isValidElement(child)).
        map(child => React.cloneElement(child, {
          setStep
        }))
      }
    </div>
  )
}
