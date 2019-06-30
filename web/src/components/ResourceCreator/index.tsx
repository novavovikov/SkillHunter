import cn from 'classnames'
import React from 'react'
import withClickOutside from 'react-click-outside'
import { Button, IconButton } from '../../UI'
import Creator from './Creator'
import * as s from './ResourceCreator.css'

interface Props {
  className?: string
  skillsetId: number
  skillId: number
}

interface State {
  isOpen: boolean
}

class ResourceCreator extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  handleClickOutside = () => {
    this.closeCreator()
  }

  openCreator = () => {
    this.setState({
      isOpen: true,
    })
  }

  closeCreator = () => {
    this.setState({
      isOpen: false,
    })
  }

  render () {
    const { className, skillId, skillsetId } = this.props
    const { isOpen } = this.state

    return (
      <div className={cn(s.ResourceCreator, className)}>
        {isOpen && (
          <Creator
            skillId={skillId}
            skillsetId={skillsetId}
            onClose={this.closeCreator}
          />
        )}

        <IconButton onClick={this.openCreator}>
          Add source
        </IconButton>
      </div>
    )
  }
}

export default withClickOutside(ResourceCreator)
