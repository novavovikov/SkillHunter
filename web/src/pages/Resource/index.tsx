import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { ResourceHeader, ResourceInfo, SignUpBlock } from '../../components'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { EResourceStatus, IUserResource } from '../../types'
import { H1 } from '../../UI'
import { ajax } from '../../utils/ajax'
import NotFound from '../NotFound'
import s from './Resource.css'

interface Params {
  userResourceId: string
}

interface Props extends RouteComponentProps<Params> {
}

interface State {
  isLoading: boolean
  userResource: IUserResource | null
}

class Resource extends Component<Props, State> {
  state = {
    isLoading: true,
    userResource: null,
  }

  componentDidMount () {
    const { match } = this.props
    const { userResourceId } = match.params

    ajax.get(`user-resource/${userResourceId}/content`).
      then(({ data }) => {
        this.setState({
          isLoading: false,
          userResource: data as IUserResource,
        })
      }).
      catch(e => {
        this.setState({
          isLoading: false,
        })
      })
  }

  removeResource = async () => {
    const { userResource }: State = this.state

    if (userResource) {
      const { history } = this.props
      const { id } = userResource

      await ajax.delete(`${API.USER_RESOURCE}/${id}`)
      history.push(ROUTES.SKILLSET)
    }
  }

  updateResource = (data: Partial<IUserResource>) => {
    const { userResource } = this.state

    if (userResource) {
      this.setState({
        userResource: {
          ...userResource as object,
          ...data,
        } as IUserResource,
      })
    }
  }

  handleLike = async () => {
    const { userResource }: State = this.state

    if (userResource) {
      const { isLiked, resource }: IUserResource = userResource

      const { data } = await ajax({
        method: isLiked ? 'delete' : 'post',
        url: `${API.RESOURCE}/${resource.id}/like`,
      })

      this.updateResource(data)
    }
  }

  changeStatus = async (status: EResourceStatus | string) => {
    const { userResource }: State = this.state

    if (userResource) {
      const { id } = userResource

      const { data } = await ajax.put(`${API.USER_RESOURCE}/${id}`, { status })
      this.updateResource(data)
    }
  }

  render () {
    const { isLoading, userResource } = this.state

    if (isLoading) {
      return null
    }

    if (!userResource) {
      return <NotFound/>
    }

    const {
      title,
      type,
      author,
      resource,
      viewOnly,
    }: IUserResource = userResource

    return (
      <div className={s.Resource}>
        <ResourceHeader
          data={userResource}
          changeStatus={this.changeStatus}
          handleLike={this.handleLike}
          onRemove={this.removeResource}
        />

        <H1 className={s.Resource__title}>
          {title || resource.title || resource.link}
        </H1>

        <ResourceInfo
          type={type}
          author={author}
          link={resource.link}
        />

        {resource.skills && (
          <div className={s.Resource__skills}>
            <div className={s.Resource__skillsTitle}>
              This resource will help to improve skills:
            </div>

            {resource.skills.map(({ id, name }) => (
              <div
                key={id}
                className={s.Resource__skillsItem}
              >
                {name}
              </div>
            ))}
          </div>
        )}

        <div className={s.Resource__footer}>
          {viewOnly
            ? <SignUpBlock/>
            : (
              <a
                className={s.Resource__watch}
                href={resource.link}
                target="_blank"
              >
                Watch
                <div className={s.Resource__watchLabel}>
                  source
                </div>
              </a>
            )
          }
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
)(Resource)
