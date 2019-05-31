import * as React from 'react'

const Login: React.FC = () => {
  React.useEffect(() => {

  window.location.href = window.location.hostname === 'localhost'
    ?'http://localhost:3000/login'
    : 'http://app.skillhunter.io/login'
  }, [])

  return null
}

export default Login
