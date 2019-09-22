import React, { Component } from 'react'
import { Button, H2, H4 } from '../../UI'
import * as s from './Onboarding.css'

interface Props {
  img: string
  onCancel?: () => void
  onSubmit: () => void
}

class Onboarding extends Component<Props> {
  render () {
    const {
      children,
      img,
      onCancel,
      onSubmit,
    } = this.props

    return (
      <div className={s.Onboarding}>
        <H2 className={s.Onboarding__title}>
          How it works?
        </H2>
        <H4 className={s.Onboarding__subtitle}>
          {children}
        </H4>

        <div className={s.Onboarding__img}>
          <img
            src={img}
            alt=""
          />
        </div>

        <div className={s.Onboarding__footer}>
          {onCancel && (
            <Button
              className={s.Onboarding__button}
              theme="transparent"
              type="button"
              onClick={onCancel}
            >
              Skip
            </Button>
          )}

          <Button
            className={s.Onboarding__button}
            onClick={onSubmit}
          >
            {onCancel
              ? 'Next'
              : 'Get Started'
            }
          </Button>
        </div>
      </div>
    )
  }
}

export default Onboarding
