import React from 'react'
import authenticatedRoute from '../components/authenticatedRoute'

function Lists() {
  return (
    <div>Lists</div>
  )
}

export default authenticatedRoute(Lists, {pathAfterFailure:"/login"})