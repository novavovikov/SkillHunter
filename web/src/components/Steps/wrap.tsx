import cn from 'classnames'
import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as s from './Steps.css'

interface Step {
  label: string | number
  id: string
}

interface Props {
  children?: any,
  initStep: string
  steps: Step[]
}

interface State {
  activeStep: string
}

export class Wrap extends React.Component<Props, State> {
  state = {
    activeStep: this.props.initStep,
  }

  setActiveStep = (activeStep: string) => {
    this.setState({ activeStep })
  }

  render () {
    const { steps, children } = this.props
    const { activeStep } = this.state

    return (
      <div className={s.Steps}>
        <div className={s.Steps__controls}>
          {[...steps].reverse().map(({ label, id }) => (
            <div
              key={id}
              className={cn(s.Steps__control, {
                [s.Steps__control_active]: id === activeStep,
              })}
            >
              {label}
            </div>
          ))}
        </div>

        <div className={s.Steps__contents}>
          <TransitionGroup component={null}>
            {React.Children.
              toArray(children).
              filter(child => React.isValidElement(child as any) && child.props.id === activeStep).
              map((child: any) => (
                <CSSTransition
                  key={child.props.id}
                  timeout={250}
                  classNames={{
                    enterActive: s.Steps__enter,
                    enterDone: s.Steps__enter_active,
                    exit: s.Steps__exit,
                    exitActive: s.Steps__exit_active,
                  }}
                >
                  {React.cloneElement(child, {
                    activeStep,
                    setStep: this.setActiveStep,
                  })}
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </div>
      </div>
    )
  }
}
