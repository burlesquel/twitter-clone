import React from 'react'
import authenticatedRoute from '../components/authenticatedRoute'

function Messages() {
  return (
    <div>M</div>
  )
}

export default authenticatedRoute(Messages, { pathAfterFailure: '/login' })
