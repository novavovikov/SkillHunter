import cn from 'classnames'
import React, { ChangeEvent, Component, createRef } from 'react'
import withClickOutside from 'react-click-outside'
import { connect } from 'react-redux'
import { API } from '../../constants/api'
import { addNotification } from '../../redux/actions/notifications'
import { INotification, IUserResource } from '../../types'
import { Icon } from '../../UI'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import { FoundResource, SearchResults } from '../index'
import * as s from './Search.css'

interface Props {
  showNotification: (data: INotification) => void
}

interface State {
  searchVisibility: boolean
  resultsVisibility: boolean
  inputValue: string
  resources: IUserResource[]
}

class Search extends Component<Props, State> {
  wrapRef = createRef<HTMLDivElement>()
  inputRef = createRef<HTMLInputElement>()

  state = {
    searchVisibility: false,
    resultsVisibility: false,
    inputValue: '',
    resources: [],
  }

  handleClickOutside () {
    const { searchVisibility } = this.state

    if (searchVisibility) {
      this.toggleSearchVisibility()
    }
  }

  clearResourcesState = () => {
    this.setState({
      inputValue: '',
      resources: [],
      resultsVisibility: false
    })

    analytics({
      event: 'click_reset',
      category: 'search'
    })
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    this.setState({
      inputValue: value,
    })

    this.findResources(value)
  }

  onFocus = () => {
    if (this.state.inputValue) {
      this.setState({
        resultsVisibility: true
      })
    }

    analytics({
      event: 'click_search_input',
      category: 'search'
    })
  }

  findResources = (query: string) => {
    ajax.
      get(`${API.USER_RESOURCE}/search?q=${query}`).
      then(({ data }) => {
        this.setState({
          resources: data,
          resultsVisibility: true
        })
      })
  }

  closeSearch = () => {
    this.setState({
      resultsVisibility: false
    })
  }

  toggleSearchVisibility = () => {
    const { current: inputNode } = this.inputRef
    const { searchVisibility } = this.state

    this.setState({
      searchVisibility: !searchVisibility,
      resultsVisibility: false,
      inputValue: ''
    })

    if (!searchVisibility && inputNode) {
      inputNode.focus()
    }
  }

  render () {
    const { resources, inputValue, resultsVisibility, searchVisibility } = this.state
    const { showNotification } = this.props

    const isOpen = inputValue !== '' && resultsVisibility
    const isEmpty = inputValue !== '' && !resources.length

    if (isEmpty) {
      analytics({
        event: 'not_found',
        search_value: inputValue,
        category: 'search'
      })
    }

    return (
      <div>
        <button
          className={s.Search__switcher}
          onClick={this.toggleSearchVisibility}
        />

        <div className={cn(s.Search, {
          [s.Search_opened]: searchVisibility,
        })}>
          <div
            className={s.Search__form}
            ref={this.wrapRef}
          >
            <input
              type="text"
              className={s.Search__input}
              value={inputValue}
              onChange={this.onChange}
              onFocus={this.onFocus}
              placeholder="Search source"
              ref={this.inputRef}
            />

            {inputValue && (
              <button
                className={s.Search__clear}
                onClick={this.clearResourcesState}
                type="button"
              >
                <Icon
                  type="remove"
                  size="18"
                />
              </button>
            )}

            <SearchResults
              isOpen={isOpen}
              isEmpty={isEmpty}
              wrapNode={this.wrapRef.current}
              onClose={this.closeSearch}
            >
              {resources.map((resource: IUserResource) => (
                <FoundResource
                  key={resource.id}
                  showNotification={showNotification}
                  data={resource}
                />
              ))}
            </SearchResults>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  null, {
    showNotification: addNotification,
  },
)(withClickOutside(Search))
