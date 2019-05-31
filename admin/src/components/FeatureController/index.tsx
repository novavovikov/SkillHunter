import * as React from 'react'
import withUser from '../../HOC/userHOC'

const FeatureController: React.FC<any> = (
  {
    user,
    roles,
    children,
    ReplacementComponent,
    ...otherProps
  },
) => {
  if (!user.data) {
    return null
  }

  if (roles.includes(user.data.role)) {
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
