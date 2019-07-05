import cn from 'classnames'
import React from 'react'
import withClickOutside from 'react-click-outside'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addResourceSaga } from '../../redux/actions/resources'
import { ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { IconButton } from '../../UI'
import { ajax } from '../../utils/ajax'
import { getUrl } from '../../utils/url'
import Form from './Form'
import * as s from './ResourceCreator.css'
import Type from './Type'

interface Props {
  className?: string
  skillsetId: number
  skillId: number
  addResource: (data: ResourceSagaPayload) => void
}

interface State {
  isOpen: boolean
  type: string
}

class ResourceCreator extends React.Component<Props, State> {
  state = {
    isOpen: false,
    type: ''
  }

  handleClickOutside = () => {
    this.closeCreator()
  }

  closeCreator = () => {
    this.setState({
      type: '',
      isOpen: false,
    })
  }

  setType = (type: string) => {
    this.setState({
      type,
      isOpen: false
    })
  }

  openCreator = () => {
    this.setState({
      isOpen: true,
    })
  }

  createResource = async (link: string) => {
    const { type } = this.state
    const { skillId, skillsetId, addResource } = this.props
    const url = getUrl(link)

    if (url) {
      const resource = await ajax.post('resource', {
        link: url.href
      }).then(({ data }) => data as ResourceType)

      addResource({
        skillsetId,
        skillId,
        resourceId: resource.id,
        data: {
          type
        }
      })

      this.closeCreator()
    }
  }

  render () {
    const { className } = this.props
    const { isOpen, type } = this.state

    return (
      <div className={cn(s.ResourceCreator, className)}>
        {isOpen && <Type onSubmit={this.setType}/>}
        {type && <Form onSubmit={this.createResource} />}

        <IconButton onClick={this.openCreator}>
          Add source
        </IconButton>
      </div>
    )
  }
}

export default compose(
  connect(
    null,
    {
      addResource: addResourceSaga,
    },
  ),
)(withClickOutside(ResourceCreator))
