import React, { Component } from 'react'
import withClickOutside from 'react-click-outside'
import Scrollbar from 'react-custom-scrollbars'
import * as s from './SearchResults.css'

interface Props {
  wrapNode: HTMLDivElement | null
  isOpen: boolean
  isEmpty: boolean
  onClose: () => void
}

class SearchResults extends Component<Props> {
  getClosestNode = (elem: any, node: any) => {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem === node) {
        return elem
      }
    }

    return null
  }

  handleClickOutside = (e: any) => {
    const { wrapNode, onClose } = this.props

    if (!this.getClosestNode(e.target, wrapNode)) {
      onClose()
    }
  }

  render () {
    const { children, isOpen, isEmpty } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <div className={s.SearchResults}>
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
      </div>
    )
  }
}

export default withClickOutside(SearchResults)
