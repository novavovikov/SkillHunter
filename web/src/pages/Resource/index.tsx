import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { ResourceHeader, SignUpBlock } from '../../components'
import { UserResourceType } from '../../types'
import { H1, Icon } from '../../UI'
import { ajax } from '../../utils/ajax'
import s from './Resource.css'

interface Params {
  userResourceId: string
}

interface Props extends RouteComponentProps<Params> {
}

interface State {
  isLoading: boolean
  userResource: UserResourceType | null
}

class Resource extends Component<Props, State> {
  state = {
    isLoading: true,
    userResource: null,
  }

  get url () {
    const { userResource } = this.state

    if (!userResource) {
      return null
    }

    const { resource }: UserResourceType = userResource
    return new URL(resource.link)
  }

  componentDidMount () {
    const { match } = this.props
    const { userResourceId } = match.params

    ajax.get(`user-resource/${userResourceId}/content`).
      then(({ data }) => {
        this.setState({
          isLoading: false,
          userResource: data as UserResourceType,
        })
      }).
      catch(e => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render () {
    const { isLoading, userResource } = this.state

    if (isLoading) {
      return null
    }

    if (!userResource) {
      return null
    }

    const {
      title,
      type,
      resource,
      userSkill,
    }: UserResourceType = userResource

    const url = this.url

    return (
      <div className={s.Resource}>
        <ResourceHeader data={userResource}/>

        <H1 className={s.Resource__title}>
          {title || resource.title || resource.link}
        </H1>

        <div className={s.Resource__info}>
          <div className={s.Resource__infoItem}>
            {type}
          </div>
          {type !== 'book' && (
            <div className={s.Resource__infoItem}>
              See original
              <Icon
                type="arrow-right"
                className={s.Resource__infoIcon}
              />
              {url && (
                <a
                  href={resource.link}
                  className={s.Resource__infoLink}
                  target="_blank"
                >
                  {url.hostname}
                </a>
              )}
            </div>
          )}
        </div>

        {userSkill && (
          <div className={s.Resource__skills}>
            <div className={s.Resource__skillsTitle}>
              This article will help to improve skills:
            </div>

            <div className={s.Resource__skillsItem}>
              {userSkill.skill.name}
            </div>
          </div>
        )}

        <div className={s.Resource__text}>
          <SignUpBlock/>
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
)(Resource)
