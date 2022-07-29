import Image from 'next/image'
import React from 'react'
import styles from './tweet.module.css'

function relativeTime(date_in_ms) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - date_in_ms;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  }

  else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  }

  else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  }

  else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}

// {
//   id:"",
//   user:{
//     id:"",
//     username:"",
//     name:"",
//     profile_photo_uri:null
//   },
//   content:{
//     text:"",
//     image:""
//   },
//   created_at:"",
//   interactions:{
//     retweets:[],
//     likes:[],
//     comments:[]
//   }
// }

export default function Tweet({tweet}) {
  return (
    <div className={styles.main}>

      <div className={styles.profilePicture}>
        <Image objectFit='contain' src={tweet?.user?.profile_photo_uri ? tweet?.user?.profile_photo_uri : "https://picsum.photos/200"} layout="fill" />
      </div>

      <div className={styles.content}>
        <span> <span>{tweet?.user?.name}</span>  <span>@{tweet?.user?.username} · {relativeTime(new Date(tweet?.created_at).getTime())}</span></span>
        <span>{tweet?.content?.text}</span>
        <div className={styles.buttons}>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-chat'></i></div>
            <span className={styles.number}>{tweet?.interactions?.comments?.length}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-recycle'></i></div>
            <span className={styles.number}>{tweet?.interactions?.retweets?.length}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-heart'></i></div>
            <span className={styles.number}>{tweet?.interactions?.likes?.length}</span>
          </div>

          <div className={styles.iconNumberContainer}>
            <div className={styles.iconContainer}><i className='bi bi-upload'></i></div>
          </div>
        </div>
      </div>

    </div>
  )
}
