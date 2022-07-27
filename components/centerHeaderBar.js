import React, { useContext } from 'react'
import styles from './centerHeaderBar.module.css'
import SearchBar from './searchBar'
import { useRouter } from 'next/router'
import Context from '../context'
export default function CenterHeaderBar({ className }) {

  const context = useContext(Context)
  const router = useRouter()
  const currentRoute = router.pathname.split("/")
  if (currentRoute.includes("home")) {
    return (
      <div className={` ${styles.main}`}>
        <div>
          <h2>Home</h2>
          <i className='bi bi-stars'></i>
        </div>
      </div>
    )
  }
  if (currentRoute.includes("explore")) {
    return (

      <div className={` ${styles.main}`}>
        <div>
          <SearchBar className={styles.explore_searchBar} />
          <i className='bi bi-gear'></i>
        </div>
      </div>

    )
  }
  else if (currentRoute.includes("notifications")) {
    return (
      <div className={` ${styles.notificationsPageBar}`}>

        <div>
          <h2>Notifications</h2>
          <i className='bi bi-stars'></i>
        </div>

        <div>
          <span>All</span>
          <span>Mentions</span>
        </div>

      </div>


    )
  }

  else if (currentRoute.includes("search")) {
    return (
      <div className={` ${styles.searchPageBar}`}>

        <div>
          <div onClick={router.back} className={styles.iconContainer}><i className='bi bi-arrow-left'></i></div>
          <SearchBar placeholder={router.query.q} className={styles.explore_searchBar} />
        </div>

        <div>
          <span>Top</span>
          <span>Latest</span>
          <span>People</span>
          <span>Photos</span>
          <span>Videos</span>
        </div>

      </div>
    )
  }

  else if(currentRoute.includes("profile")){
    return (
      <div className={`${styles.profileBar} ${styles.main}`}>
          <div onClick={router.back} className={styles.iconContainer}><i className='bi bi-arrow-left'></i></div>
          <div>
            <h3>{context?.user?.name}</h3>
            <span>{context?.user?.tweets?.length} Tweets</span>
          </div>

      </div>
    )
  }
}
