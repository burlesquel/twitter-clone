import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './profileBadge.module.css'
export default function ProfileBadge({className, followable=false}) {
  return (
    <Link href={"/profile"} >

    <div className={`${styles.profileContainer} ${className}`}>

      <div className={styles.profileImage}>
        <Image src={"https://pbs.twimg.com/profile_images/1514936411836850185/j1yCW-1V_bigger.jpg"} layout="fill" />
      </div>

      <div className={styles.userNames}>
        <span>
          Batu
        </span>
        <span>
          @batumanav
        </span>
      </div>
      
      {followable && 
      <div className={styles.followButton}>Follow</div>}
    </div>

  </Link>
  )
}
