import React from 'react'
import authenticatedRoute from '../components/authenticatedRoute'

function Bookmarks() {
  return (
    <div>Bookmarks</div>
  )
}

export default authenticatedRoute(Bookmarks, {pathAfterFailure:"/login"})