import cn from 'classnames'
import * as React from 'react'
import { ChangeEvent } from 'react'
import { ResourceType } from '../../types'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './ResourceCreator.css'

interface Props {
  className?: string
  skillId?: number
}

interface State {
  isOpen: boolean
  inputValue: string
}

class ResourceCreator extends React.Component<Props, State> {
  state = {
    isOpen: false,
    inputValue: '',
  }

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  toggleForm = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  submitForm = async (e: any) => {
    e.preventDefault()
    const { inputValue } = this.state

    if (inputValue) {
      const resource = await ajax.post('resource', {
        link: inputValue,
      }).then(({ data  }) => data as ResourceType)

      const userResources = await ajax.post('user/resource', {
        resourceId: resource.id,
      })

      console.log(123, userResources)
    }
  }

  render () {
    const { className } = this.props
    const { isOpen, inputValue } = this.state

    return (
      <div className={cn(s.ResourceCreator, className)}>
        {isOpen && (
          <form onSubmit={this.submitForm}>
            <input
              type="text"
              className={s.ResourceCreator__input}
              onChange={this.onChangeInput}
              value={inputValue}
              autoFocus
            />
          </form>
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
