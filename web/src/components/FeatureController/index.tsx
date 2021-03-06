import React, { FC } from 'react'
import { RoleType } from '../../constants/role-type'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'

interface Props {
  user: UserState
  roles: RoleType[]
  otherProps: any
}

const FeatureController: FC<any> = (
  {
    user,
    roles,
    children,
    ReplacementComponent,
    ...otherProps
  },
) => {
  if (!user) {
    return null
  }

  if (roles.includes(user.role)) {
    return React.Children.only(
      React.cloneElement(
        children,
        otherProps,
      ),
    )
  }

  if (ReplacementComponent) {
    return <ReplacementComponent {...otherProps}/>
  }

  return null
}

export default withUser(FeatureController)
