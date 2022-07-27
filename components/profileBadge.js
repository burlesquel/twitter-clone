import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './profileBadge.module.css'
export default function ProfileBadge({className, followable=false, user, ...props}) {
  return (
    <div {...props} >

    <div className={`${styles.profileContainer} ${className}`}>

      <div className={styles.profileImage}>
        <Image src={user?.media?.profile_photo_uri ? user?.media?.profile_photo_uri : "https://picsum.photos/200"} layout="fill" />
      </div>

      <div className={styles.userNames}>
        <span>
          {user?.name}
        </span>
        <span>
          @{user?.username}
        </span>
      </div>
      
      {followable && 
      <div className={styles.followButton}>Follow</div>}
    </div>

  </div>
  )
}
