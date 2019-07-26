import cn from 'classnames'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ResourcePreviewInfo, ResourcePreviewStatus } from '../../components'
import { ROUTES } from '../../constants/routing'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { EResourceStatus, IUserResource } from '../../types'
import { Icon, Item, Menu, Status } from '../../UI'
import { ShareMenu } from '../index'
import * as s from './ResourcePreview.css'

interface Props {
  data: IUserResource,
  likeHandler: (data: ResourceLikeStatusSagaPayload) => void
  updateHandler: (data: Partial<IUserResource>) => void
  removeHandler: (data: Partial<IUserResource>) => void
}

class ResourcePreview extends React.Component<Props> {
  static defaultProps = {
    updateHandler: (data: Partial<IUserResource>) => {},
    removeHandler: (data: Partial<IUserResource>) => {},
  }

  handleStatus = (status: string) => {
    const {
      updateHandler,
      data: { id, userSkill },
    } = this.props

    updateHandler({
      id,
      userSkill,
      status,
    })
  }

  handleLike = () => {
    const { data, likeHandler } = this.props

    likeHandler({
      resourceId: data.resource.id,
      isLiked: !data.isLiked,
    })
  }

  handleRemove = () => {
    const {
      removeHandler,
      data: {
        id,
        userSkill
      },
    } = this.props

    removeHandler({ id, userSkill })
  }

  render () {
    const { data } = this.props

    return (
      <div className={s.ResourcePreview}>
        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_info)}>
          <ResourcePreviewInfo data={data}/>
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_status)}>
          <Menu
            position="left"
            Component={(props) => (
              <ResourcePreviewStatus
                status={data.status}
                className={cn(s.ResourcePreview__status, {
                  [s.ResourcePreview__status_backlog]: data.status === EResourceStatus.Backlog,
                  [s.ResourcePreview__status_plan]: data.status === EResourceStatus.Plan,
                  [s.ResourcePreview__status_done]: data.status === EResourceStatus.Done,
                })}
                {...props}
              />
            )}
          >
            {Object.keys(EResourceStatus).map(status => (
              <Item
                onClick={() => this.handleStatus(status)}
                key={status}
              >
                <Status value={status}/>
              </Item>
            ))}
          </Menu>
        </div>

        <div className={cn(s.ResourcePreview__col, s.ResourcePreview__col_actions)}>
          <Link
            to={`${ROUTES.RESOURCE}/${data.id}`}
            className={s.ResourcePreview__control}
          >
            More
            <Icon
              type="arrow-right"
              size="18"
            />
          </Link>

          <div className={s.ResourcePreview__control}>
            <ShareMenu
              link={`${ROUTES.RESOURCE}/${data.id}`}
              text={data.title}
            />
          </div>
          <button
            className={s.ResourcePreview__control}
            onClick={this.handleLike}
          >
            <span className={s.ResourcePreview__likes}>{data.likes}</span>
            <Icon
              type={data.isLiked ? 'heart-filled' : 'heart'}
              active={data.isLiked}
            />
          </button>

            <Menu className={s.ResourcePreview__menu}>
              <Item onClick={this.handleRemove}>
                Delete
              </Item>
            </Menu>
        </div>
      </div>
    )
  }
}

export default ResourcePreview
