import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Server } from '../../API'
import authenticatedRoute from '../../components/authenticatedRoute'
import ProfileDetails from '../../components/profileDetails'
import Tweets from '../../components/tweets'
import Context from '../../context'
import styles from './Index.module.css'

function Profile() {
  const router = useRouter()
  const context = useContext(Context)
  const { username } = router.query
  const [user, setUser] = useState(null)
  useEffect(() => {
    Server.getUser({ username: username }).then(res => {
      setUser(res.data[0])
      context.setCurrentDisplayedProfile(res.data[0])
    })
  }, [router])

  if (user) {
    return (
      <div className={styles.main}>
        <ProfileDetails self={username === context?.user?.username ? true : false} user={user} />
        <Tweets  query={ { $or: [ { 'interactor_user.username': username }, { 'user.username': username } ] }}/>
      </div>
    )
  }
  else {
    <div>WAITING..</div>
  }
}

export default authenticatedRoute(Profile, { pathAfterFailure: "/login" })
