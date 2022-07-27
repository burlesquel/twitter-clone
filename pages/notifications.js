import React from 'react'
import authenticatedRoute from '../components/authenticatedRoute'

function Notifications() {
  return (
    <div>Notifications</div>
  )
}

export default authenticatedRoute(Notifications, {pathAfterFailure:"/login"})
