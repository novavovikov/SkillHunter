import React, { ChangeEvent, Component, createRef } from 'react'
import { connect } from 'react-redux'
import { API } from '../../constants/api'
import { addNotification } from '../../redux/actions/notifications'
import { NotificationType, UserResourceType } from '../../types'
import { ajax } from '../../utils/ajax'
import { Icon } from '../../UI'
import { FoundResource, SearchResults } from '../index'
import * as s from './Search.css'

interface Props {
  showNotification: (data: NotificationType) => void
}

interface State {
  inputValue: string
  resources: UserResourceType[]
}

class Search extends Component<Props, State> {
  wrapRef = createRef<HTMLDivElement>()

  state = {
    inputValue: '',
    resources: [],
  }

  clearResourcesState = () => {
    this.setState({
      inputValue: '',
      resources: [],
    })
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    this.setState({
      inputValue: value,
    })

    this.findResources(value)
  }

  findResources = (query: string) => {
    ajax.
      get(`${API.USER_RESOURCE}/search?q=${query}`).
      then(({ data }) => {
        this.setState({
          resources: data,
        })
      })
  }

  render () {
    const { resources, inputValue } = this.state
    const { showNotification } = this.props

    return (
      <div
        className={s.Search}
        ref={this.wrapRef}
      >
        <input
          type="text"
          className={s.Search__input}
          onChange={this.onChange}
          onFocus={this.onChange}
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
          isOpen={inputValue !== ''}
          isEmpty={inputValue !== '' && !resources.length}
          wrapNode={this.wrapRef.current}
          onClose={this.clearResourcesState}
        >
          {resources.map((resource: UserResourceType) => (
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
