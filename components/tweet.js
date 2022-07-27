import Image from 'next/image'
import React from 'react'
import styles from './tweet.module.css'
export default function Tweet({
  username="batumanav", 
  name="Batuhan", 
  profile_pic_uri="https://pbs.twimg.com/profile_images/1514936411836850185/j1yCW-1V_bigger.jpg",
  content={
    text:"This is a testing tweet.",
    image:null,
  }, 
  interactions={
    comments:0, 
    likes:0, 
    retweets:0} }) {
  return (
    <div className={styles.main}>

      <div className={styles.profilePicture}>
        <Image objectFit='contain' src={profile_pic_uri ? profile_pic_uri : "https://picsum.photos/200"} layout="fill" />
      </div>

      <div className={styles.content}>
        <span> <span>{name}</span>  <span>@{username} · 12h</span></span>
        <span>{content.text}</span>
        <div className={styles.buttons}>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-chat'></i></div>
            <span className={styles.number}>{interactions.comments}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-recycle'></i></div>
            <span className={styles.number}>{interactions.retweets}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-heart'></i></div>
            <span className={styles.number}>{interactions.likes}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-upload'></i></div>
          </div>
        </div>
      </div>

    </div>
  )
}
