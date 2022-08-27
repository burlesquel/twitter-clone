import React from 'react'
import authenticatedRoute from '../../components/authenticatedRoute'
import CenterHeaderBar from '../../components/centerHeaderBar'
import SearchBar from '../../components/searchBar'
import styles from './index.module.css'
function Messages() {
  return (
    <div className={styles.main}>
      
        <div className={styles.left}>
        <SearchBar className={styles.searchBar} placeholder="Search Direct Messages"/>
        </div>
        <div className={styles.right}>
          right
        </div>
    </div>
  )
}

export default authenticatedRoute(Messages, { pathAfterFailure: '/login' })
