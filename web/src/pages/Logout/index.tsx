import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { logoutUser } from '../../redux/actions/user'
import { ROUTES } from '../../constants/routing'

interface Props {
  logoutUser: () => void
}

const Logout:FC<Props> = ({ logoutUser }) => {
  React.useEffect(() => {
    logoutUser()
  })

  return <Redirect to={ROUTES.LOGIN}/>
}

export default connect(
  null,
  {
    logoutUser
  }
)(Logout)
