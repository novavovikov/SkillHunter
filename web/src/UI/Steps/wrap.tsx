import React from 'react'
import cn from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import * as s from './Steps.css'

interface Props {
  className?: string
  activeStep: any
}

export class Wrap extends React.Component<Props> {
  render () {
    const { children, className, activeStep } = this.props

    return (
      <div className={cn(s.Steps, className)}>
        <TransitionGroup component={null}>
          {React.Children
            .toArray(children)
            .filter(child => React.isValidElement(child) && child.props.id === activeStep)
            .map((child: any) => (
              <CSSTransition
                key={child.props.id}
                timeout={300}
                classNames={{
                  enterActive: s.Steps__enter,
                  enterDone: s.Steps__enter_active,
                  exit: s.Steps__exit,
                  exitActive: s.Steps__exit_active,
                }}
              >
                {React.cloneElement(child, { activeStep })}
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </div>
    )
  }
}
