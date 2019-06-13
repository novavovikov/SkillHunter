import * as React from 'react'
import cn from 'classnames'
import { Button } from '../../UI'
import * as s from './ResourceCreator.css'

interface Props {
  className?: string
}

interface State {
  isOpen: boolean
}

class ResourceCreator extends React.Component<Props, State> {
  state = {
    isOpen: false
  }

  toggleForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const { className } = this.props
    const { isOpen } = this.state

    return (
      <div className={cn(s.ResourceCreator, className)}>
        {isOpen && (
          <input
            type="text"
            className={s.ResourceCreator__input}
            autoFocus
          />
        )}

        <Button
          onClick={this.toggleForm}
          theme="plus"
        >
          Add new
        </Button>
      </div>
    )
  }
}

export default ResourceCreator
