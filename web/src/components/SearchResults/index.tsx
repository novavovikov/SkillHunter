import React, { Component } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { OutsideClickWrapper } from '../../UI'
import * as s from './SearchResults.css'

interface Props {
  wrapNode: HTMLDivElement | null
  isOpen: boolean
  isEmpty: boolean
  onClose: () => void
}

class SearchResults extends Component<Props> {
  handleClose = (e: MouseEvent) => {
    const { wrapNode, onClose } = this.props
    const isContainNode = wrapNode && wrapNode.contains(e.target as any)

    if (!isContainNode) {
      onClose()
    }
  }

  render () {
    const { children, isOpen, isEmpty } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <OutsideClickWrapper
        className={s.SearchResults}
        handler={this.handleClose}
      >
        {isEmpty
          ? (
            <div className={s.SearchResults__empty}>
              No sources found
            </div>
          )
          : (
            <Scrollbar
              autoHeightMin={0}
              autoHeightMax={280}
              autoHeight
              autoHide
            >
              <div className={s.SearchResults__content}>
                {children}
              </div>
            </Scrollbar>
          )
        }
      </OutsideClickWrapper>
    )
  }
}

export default SearchResults
