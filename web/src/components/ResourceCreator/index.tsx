import cn from 'classnames'
import * as React from 'react'
import withClickOutside from 'react-click-outside'
import { Button } from '../../UI'
import Creator from './Creator'
import * as s from './ResourceCreator.css'

interface Props {
  className?: string
  professionId?: number
  skillId?: number
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
    const { className, skillId, professionId } = this.props
    const { isOpen } = this.state

    return (
      <div className={cn(s.ResourceCreator, className)}>
        {isOpen && (
          <Creator
            skillId={skillId}
            professionId={professionId}
            onClose={this.closeCreator}
          />
        )}

        <Button
          onClick={this.openCreator}
          theme="plus"
        >
          Add source
        </Button>
      </div>
    )
  }
}

export default withClickOutside(ResourceCreator)
