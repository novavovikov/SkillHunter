import React from 'react'

const NotFound: React.FC = () => {
  window.location.replace(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/404'
      : 'https://app.skillhunter.io/404',
  )

  return null
}

export default NotFound
