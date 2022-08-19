import React from 'react'
import Image from 'next/image'
import styles from './profileBadge.module.css'
import { useRouter } from 'next/router'
export default function ProfileBadge({ className, followable = false, user, ...props }) {
  const router = useRouter()
  return (
    <div onClick={()=>{router.push(`/profile/${user?.username}`)}} {...props} >

      <div className={`${styles.profileContainer} ${className}`}>

        <div className={styles.profileImage}>
          <Image src={user?.media?.profile_photo_uri ? user?.media?.profile_photo_uri : "https://picsum.photos/200"} layout="fill" objectFit='cover' />
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
