import React, { ChangeEvent, Component, createRef } from 'react'
import { connect } from 'react-redux'
import { API } from '../../constants/api'
import { addNotification } from '../../redux/actions/notifications'
import { INotification, IUserResource } from '../../types'
import { ajax } from '../../utils/ajax'
import { Icon } from '../../UI'
import { FoundResource, SearchResults } from '../index'
import * as s from './Search.css'

interface Props {
  showNotification: (data: INotification) => void
}

interface State {
  resultsVisibility: boolean
  inputValue: string
  resources: IUserResource[]
}

class Search extends Component<Props, State> {
  wrapRef = createRef<HTMLDivElement>()

  state = {
    resultsVisibility: false,
    inputValue: '',
    resources: [],
  }

  clearResourcesState = () => {
    this.setState({
      inputValue: '',
      resources: [],
      resultsVisibility: false
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

  render () {
    const { resources, inputValue, resultsVisibility } = this.state
    const { showNotification } = this.props

    return (
      <div
        className={s.Search}
        ref={this.wrapRef}
      >
        <input
          type="text"
          className={s.Search__input}
          value={inputValue}
          onChange={this.onChange}
          onFocus={this.onFocus}
          placeholder="Search source"
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
          isOpen={inputValue !== '' && resultsVisibility}
          isEmpty={inputValue !== '' && !resources.length}
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
    )
  }
}
export default connect(
  null, {
    showNotification: addNotification,
  },
)(Search)
