import { useContext } from 'react'
import authenticatedRoute from '../components/authenticatedRoute'
import Tweets from '../components/tweets'
import WhatsHappening from '../components/whatsHappening'
import Context from '../context'
import styles from '../styles/Home.module.css'

function Home() {
  const context = useContext(Context)

  return (
    <div className={styles.container}>
      <WhatsHappening />
      <Tweets query={{}}/>
    </div>
  )
}

export default authenticatedRoute(Home, { pathAfterFailure: "/login" })
