import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import * as s from './Animation.css'

export const Dropdown: FC<Partial<CSSTransitionProps>> = ({ children, ...rest }) => {
  return (
    <CSSTransition
      timeout={100}
      unmountOnExit
      classNames={{
        enterActive: s.Dropdown__enter,
        enterDone: s.Dropdown__enter_active,
        exit: s.Dropdown__exit,
        exitActive: s.Dropdown__exit_active,
      }}
      {...rest}
    >
      {children}
    </CSSTransition>
  )
}
