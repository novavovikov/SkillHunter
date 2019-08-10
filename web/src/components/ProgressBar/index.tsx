import cn from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RootState } from '../../redux/reducers'
import { LoadingState } from '../../redux/reducers/loading'
import s from './ProgressBar.css'

interface Props {
  loading: LoadingState
}

class ProgressBar extends Component<Props> {
  render () {
    const { loading } = this.props
    const isLoading = Object.values(loading).some((value: boolean) => value)

    return (
      <CSSTransition
        in={isLoading}
        timeout={{
          appear: 0,
          enter: 0,
          exit: 200,
        }}
        unmountOnExit
        classNames={{
          enterActive: s.ProgressBar__enter,
          enterDone: s.ProgressBar__enter_active,
          exit: s.ProgressBar__exit,
          exitActive: s.ProgressBar__exit_active,
        }}
      >
        <div className={s.ProgressBar}/>
      </CSSTransition>
    )
  }
}

export default connect(
  ({ loading }: RootState) => ({
    loading,
  }),
)(ProgressBar)
