import cn from 'classnames'
import React, { createRef } from 'react'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addResourceSaga } from '../../redux/actions/resources'
import { ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { ajax } from '../../utils/ajax'
import { getUrl } from '../../utils/url'
import LinkForm from './LinkForm'
import * as s from './ResourceCreator.css'
import TypeForm from './TypeForm'

enum ModalTypes {
  type = 'type',
  link = 'link'
}

interface Props {
  className?: string
  skillsetId: number
  skillId: number
  onClose: () => void
  addResource: (data: ResourceSagaPayload) => void
}

interface State {
  formPosition: any
  modalType: ModalTypes
  type: string
}

class ResourceCreator extends React.Component<Props, State> {
  private wrapRef = createRef<HTMLDivElement>()

  state = {
    modalType: ModalTypes.type,
    formPosition: {},
    type: '',
  }

  componentDidMount () {
    this.setState({
      formPosition: this.getFormPosition()
    })
  }

  setType = (type: string) => {
    this.setState({
      modalType: ModalTypes.link,
      type,
    })
  }

  createResource = async (link: string) => {
    const { type } = this.state
    const { skillId, skillsetId, addResource, onClose } = this.props
    const url = getUrl(link)

    if (url) {
      const resource = await ajax.post('resource', {
        link: url.href,
      }).then(({ data }) => data as ResourceType)

      addResource({
        skillsetId,
        skillId,
        resourceId: resource.id,
        data: {
          type,
        },
      })

      onClose()
    }
  }

  getFormPosition = () => {
    const { current } = this.wrapRef

    if (current) {
      const params = current.getBoundingClientRect()

      return {
        left: `${params.left}px`,
        top: `${params.top}px`
      }
    }
  }

  render () {
    const { className, onClose } = this.props
    const { modalType, formPosition } = this.state

    return (
      <div
        className={cn(s.ResourceCreator, className)}
        ref={this.wrapRef}
      >
        {createPortal(
          (
            <div className={s.ResourceCreator__modal}>
              <div
                className={s.ResourceCreator__overlay}
                onClick={onClose}
              />
              <div
                className={s.ResourceCreator__form}
                style={formPosition}
              >
                {modalType === ModalTypes.type && <TypeForm onSubmit={this.setType}/>}
                {modalType === ModalTypes.link && <LinkForm onSubmit={this.createResource}/>}
              </div>
            </div>
          ),
          document.body,
        )}
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
)(ResourceCreator)
