import * as React from 'react'
import withUser from '../../HOC/userHOC'
import { RoleType } from '../../constants/role-type'
import { UserState } from '../../redux/reducers/user'

interface Props {
  user: UserState
  roles: RoleType[]
}

const FeatureController: React.FC<Props> = ({ user, roles, children }) => {
  if (user.data && roles.includes(user.data.role)) {
    return (
      <>{children}</>
    )
  }

  return null
}

export default withUser(FeatureController)
