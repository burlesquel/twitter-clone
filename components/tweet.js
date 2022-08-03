import Image from 'next/image'
import React, { useContext, useState} from 'react'
import styles from './tweet.module.css'
import { useRouter } from 'next/router'
import { Server } from '../API';
import Context from '../context'
import { CSSTransition } from 'react-transition-group';

function relativeTime(date_in_ms) {


  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date().getTime() - date_in_ms;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + 's';
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + 'm';
  }

  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + 'h';
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + 'd';
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + 'mo';
  }

  else {
    return Math.round(elapsed / msPerYear) + 'y';
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

export default function Tweet({ tweet_, refreshTweets }) {

  const router = useRouter()
  const context = useContext(Context)

  const [tweet, setTweet] = useState(tweet_?.tweet || tweet_) // IF IT IS A RETWEET, THE FIRST ONE WILL RETURN FALSY

  const alreadyInteracted =
    [tweet.interactions?.likes?.includes(context.user.id),
    tweet.interactions?.retweets?.includes(context.user.id),
    tweet.interactions?.comments?.includes(context.user.id),]

  const on_interaction = (type) => {
    if (alreadyInteracted[type]) {
      deleteInteraction(type)
    }
    else {
      newInteraction(type)
    }
  }

  const newInteraction = (type) => {

    Server.newInteraction(type, tweet.id, { id: context.user.id, username: context.user.username }, { id: tweet.user.id, username: tweet.user.id }, new Date(), {}).then(res => {
      refreshTweet()
      type === 1 && refreshTweets()
    }).catch(err => {
      console.log(err);
    })

  }

  const deleteInteraction = (type) => {

    Server.deleteInteraction(type, tweet.id, { id: context.user.id, username: context.user.username }).then(res => {
      refreshTweet()
      type === 1 && refreshTweets()
    }).catch(err => {
      console.log(err);
    })

  }

  function refreshTweet() {
    Server.getTweets({ id: tweet.id }).then(res => {
      setTweet(res.data[0])
    })
  }
  

  function goProfile() {
    router.push(`/profile/${tweet?.user?.username}`)
  }
  return (


      <div className={styles.container}>
      {tweet_.retweet && <span className={styles.retweeted_by}><i className='bi bi-recycle'></i> <span onClick={() => { router.push(`/profile/${tweet_.interactor_user?.username}`) }}> {tweet_.interactor_user?.username} retweeted</span></span>}
      <div className={styles.main}>

        <div onClick={goProfile} className={styles.profilePicture}>
          <Image objectFit='cover' src={tweet?.user?.profile_photo_uri ? tweet?.user?.profile_photo_uri : "https://picsum.photos/200"} layout="fill" />
        </div>

        <div className={styles.content}>
          <span > <span onClick={goProfile}>{tweet?.user?.name}</span>  <span onClick={goProfile}>@{tweet?.user?.username} · {relativeTime(new Date(tweet?.created_at).getTime())}</span></span>
          <span>{tweet?.content?.text}</span>
          <div className={styles.buttons}>

            <div className={styles.iconNumberContainer} >
              <div onClick={() => { alert("Very soon :)") }} className={styles.iconContainer}><i className='bi bi-chat'></i></div>
              <span className={styles.number}>{tweet?.interactions?.comments?.length}</span>
            </div>

            <div className={styles.iconNumberContainer} style={{ color: alreadyInteracted[1] && "#54CFA6" }}  >
              <div onClick={() => { on_interaction(1) }} className={styles.iconContainer}><i className='bi bi-recycle'></i></div>
              <span className={styles.number}>{tweet?.interactions?.retweets?.length}</span>
            </div>

            <div className={styles.iconNumberContainer} style={{ color: alreadyInteracted[0] && "#F91880" }}>
              <div onClick={() => { on_interaction(0) }} className={styles.iconContainer}><i className={`bi bi-heart${alreadyInteracted[0] ? "-fill" : ""}`}></i></div>
              <span className={styles.number}>{tweet?.interactions?.likes?.length}</span>
            </div>

            <div className={styles.iconNumberContainer}>
              <div onClick={() => { alert("Very soon :)") }} className={styles.iconContainer}><i className='bi bi-upload'></i></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
  )
}
