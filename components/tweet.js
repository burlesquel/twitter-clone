import Image from 'next/image'
import React from 'react'
import styles from './tweet.module.css'
export default function Tweet() {
  return (
    <div className={styles.main}>

      <div className={styles.profilePicture}>
        <Image objectFit='contain' src={"https://pbs.twimg.com/profile_images/1514936411836850185/j1yCW-1V_bigger.jpg"} layout="fill" />
      </div>

      <div className={styles.content}>
        <span> <span>Batuhan</span>  <span>@batumanav · 12h</span></span>
        <span>This is a testing tweet.</span>
        <div className={styles.buttons}>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-chat'></i></div>
            <span className={styles.number}>12</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-recycle'></i></div>
            <span className={styles.number}>12</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-heart'></i></div>
            <span className={styles.number}>12</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-upload'></i></div>
          </div>
        </div>
      </div>

    </div>
  )
}
