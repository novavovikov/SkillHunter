import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Footer, ResourceContent, ResourceHeader, ResourceInfo, SignUpBlock } from '../../components'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { EResourceStatus, EResourceTypes, IUserResource } from '../../types'
import { H1, Head, Layout } from '../../UI'
import { ajax } from '../../utils/ajax'
import { analytics } from '../../utils/analytics'
import NotFound from '../NotFound'
import { WELCOME_RESOURCE_ID } from '../../constants/welcome'
import Welcome from '../../components/Welcome'
import s from './Resource.css'

interface Params {
  userResourceId: string
}

type Props = RouteComponentProps<Params>

interface State {
  isLoading: boolean
  userResource: IUserResource | null
}

class Resource extends Component<Props, State> {
  state = {
    isLoading: true,
    userResource: null,
  }

  async componentDidMount () {
    const { match } = this.props
    const { userResourceId } = match.params

    try {
      const { data: userResource }: { data: IUserResource } = await ajax.get(`user-resource/${userResourceId}/content`)

      this.setState({
        isLoading: false,
        userResource,
      })
    } catch (e) {
      this.setState({
        isLoading: false,
      })
    }
  }

  removeResource = async () => {
    const { userResource }: State = this.state

    if (userResource) {
      const { history } = this.props
      const { id, title, resource }: IUserResource = userResource

      await ajax.delete(`${API.USER_RESOURCE}/${id}`)
      history.push(ROUTES.LIBRARY)

      analytics({
        event: 'click_delete_source',
        source_title: title ||
          resource.title ||
          resource.link,
        category: 'source_page',
      })
    }
  }

  updateResource = (data: Partial<IUserResource>) => {
    const { userResource }: State = this.state

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
      const { isLiked, resource, title }: IUserResource = userResource

      const { data } = await ajax({
        method: isLiked ? 'delete' : 'post',
        url: `${API.RESOURCE}/${resource.id}/like`,
      })

      this.updateResource(data)

      analytics({
        event: !isLiked ? 'liked_source' : 'unliked_source',
        source_title: title ||
          resource.title ||
          resource.link,
        category: 'source_page',
      })
    }
  }

  changeStatus = async (status: EResourceStatus | string) => {
    const { userResource }: State = this.state

    if (userResource) {
      const { id } = userResource

      const { data } = await ajax.put(`${API.USER_RESOURCE}/${id}`, { status })
      this.updateResource(data)

      analytics({
        event: 'click_status',
        source_status: status,
        category: 'source_page',
      })
    }
  }

  handleWatch = () => {
    const { userResource }: State = this.state

    if (userResource) {
      const { resource, title }: IUserResource = userResource

      analytics({
        event: 'click_watch_source',
        source_title: title ||
          resource.title ||
          resource.link,
        category: 'source_page',
      })
    }
  }

  render () {
    const { isLoading, userResource }: State = this.state

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
      isAuthorized,
    }: IUserResource = userResource

    const resourceTitle = title || resource.title || resource.link

    return (
      <Layout.Wrap>
        <Head
          title={resourceTitle}
          creator={author}
          image={resource.image}
          description={resource.text}
        />

        <div className={s.Resource}>
          <ResourceHeader
            data={userResource}
            changeStatus={this.changeStatus}
            handleLike={this.handleLike}
            onRemove={this.removeResource}
          />

          <H1 className={s.Resource__title}>
            {resourceTitle}
          </H1>

          {resource.id === WELCOME_RESOURCE_ID && (
            <Welcome/>
          )}

          {resource.id !== WELCOME_RESOURCE_ID && (
            <>
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

              {type !== EResourceTypes.Book && (
                <ResourceContent data={resource}/>
              )}

              <div className={s.Resource__footer}>
                <a
                  className={s.Resource__watch}
                  href={type === EResourceTypes.Book
                    ? `https://www.google.com/search?q=${author} ${title}`
                    : resource.link
                  }
                  target="_blank"
                  onClick={this.handleWatch}
                >
                  Watch
                  <div className={s.Resource__watchLabel}>
                    resource
                  </div>
                </a>
              </div>
            </>
          )}

          {!isAuthorized && (
            <div className={s.Resource__footer}>
              <SignUpBlock/>
            </div>
          )}
        </div>

        <Footer/>
      </Layout.Wrap>
    )
  }
}

export default compose(
  withRouter,
)(Resource)
