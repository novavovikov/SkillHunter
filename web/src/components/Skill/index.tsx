import cn from 'classnames'
import * as React from 'react'
import { Button } from '../../UI'
import { Resource, ResourceCreator } from '../index'
import * as s from './Skill.css'

interface Props {}

interface State {
  isOpen: boolean
}

class Skill extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { isOpen } = this.state

    return (
      <div className={s.Skill}>
        <div className={s.Skill__header}>
          <h4 className={s.Skill__title}>
            Team Build
          </h4>

          {!isOpen && (
            <button
              className={cn(s.Skill__switcher, s.Skill__button)}
              onClick={this.toggleOpen}
            >
              Show
            </button>
          )}

          <ResourceCreator
            className={s.Skill__button}
          />
        </div>

        {isOpen && (
          <div className={s.Skill__body}>
            <Resource/>
            <Resource/>
            <Resource/>
            <Resource/>
            <Resource/>
          </div>
        )}

        {isOpen && (
          <div className={s.Skill__footer}>
            <button
              className={s.Skill__switcher}
              onClick={this.toggleOpen}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Skill
