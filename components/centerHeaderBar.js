import React from 'react'
import styles from './centerHeaderBar.module.css'
import SearchBar from './searchBar'
import {useRouter} from 'next/router'
export default function CenterHeaderBar({className}) {
  const currentRoute = useRouter().asPath.split("/")
  console.log(currentRoute);
  if(currentRoute.includes("home")){
    return (
      <div className={` ${styles.main}`}>
        {/* <SearchBar /> */}
        <h2>Home</h2>
        <i className='bi bi-stars'></i>
      </div>
    )
  }
  if(currentRoute.includes("explore")){
    return (
      <div className={` ${styles.main}`}>
         <SearchBar className={styles.explore_searchBar}/> 
        <i className='bi bi-gear'></i>
      </div>
    )
  }
  else if(currentRoute.includes("notifications")){
    return (
      <div className={` ${styles.main} ${styles.doubleHeight}`}>
        {/* <SearchBar /> */}
        <h2>Notifications</h2>
        <i className='bi bi-stars'></i>
      </div>
    )
  }
  
}
