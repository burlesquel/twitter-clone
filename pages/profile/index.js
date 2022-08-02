import React, { useContext} from 'react'
import ProfileDetails from '../../components/profileDetails'
import authenticatedRoute from '../../components/authenticatedRoute'
import Context from '../../context'
import styles from './Index.module.css'
import Tweets from '../../components/tweets'

// const query = find( { $or: [ { 'interactor_user.id': context.user.id }, { 'user.id': context.user.id } ] } )
function Profile() {
  const context = useContext(Context)

  return (
    <div className={styles.main}>
      <ProfileDetails self/>
      <Tweets query={ { $or: [ { 'interactor_user.id': context.user.id }, { 'user.id': context.user.id } ] } }/>
    </div>
  )
}

export default authenticatedRoute(Profile, { pathAfterFailure: "/login" })
