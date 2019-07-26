import cn from 'classnames'
import React, { createRef } from 'react'
import { createPortal } from 'react-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { addResourceSaga } from '../../redux/actions/resources'
import { AddResourceSagaPayload } from '../../redux/interfaces/resources'
import { IResource } from '../../types'
import BookForm from './BookForm'
import LinkForm from './LinkForm'
import * as s from './ResourceCreator.css'
import TypeForm from './TypeForm'

const LINK_TYPES = [
  'article',
  'media',
  'course',
]

interface Props {
  className?: string
  skillsetId: number
  skillId: number
  onClose: () => void
  addResource: (data: AddResourceSagaPayload) => void
}

interface State {
  formPosition: any
  typeModalVisibility: boolean
  type: string
}

class ResourceCreator extends React.Component<Props, State> {
  private wrapRef = createRef<HTMLDivElement>()

  state = {
    typeModalVisibility: true,
    formPosition: {},
    type: '',
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyPress)

    this.setState({
      formPosition: this.getFormPosition(),
    })
  }

  componentWillUnmount (): void {
    window.removeEventListener('keydown', this.onKeyPress)
  }

  onKeyPress = (e: any) => {
    const { onClose } = this.props

    if (
      e.key === 'Escape' &&
      typeof onClose === 'function'
    ) {
      onClose()
    }
  }

  setType = (type: string) => {
    this.setState({
      typeModalVisibility: false,
      type,
    })
  }

  createResource = (data: Partial<IResource>) => {
    const { type } = this.state
    const { skillId, skillsetId, addResource, onClose } = this.props

    addResource({
      skillsetId,
      skillId,
      data: {
        ...data,
        type,
      },
    })

    onClose()
  }

  getFormPosition = () => {
    const { current } = this.wrapRef

    if (current) {
      const params = current.getBoundingClientRect()

      return {
        left: `${params.left}px`,
        top: `${params.top}px`,
      }
    }
  }

  render () {
    const { className, onClose } = this.props
    const { typeModalVisibility, type, formPosition } = this.state

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
                {typeModalVisibility && <TypeForm onSubmit={this.setType}/>}

                {type && (
                  LINK_TYPES.includes(type)
                    ? <LinkForm onSubmit={this.createResource}/>
                    : <BookForm onSubmit={this.createResource}/>
                )}
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
