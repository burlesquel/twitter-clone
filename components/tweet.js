import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
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

export default function Tweet({ tweet_, removeTweet}) {

  const router = useRouter()
  const context = useContext(Context)

  const [tweet, setTweet] = useState(tweet_.retweet ? tweet_.tweet : tweet_) // IF IT IS A RETWEET, THE FIRST ONE WILL RETURN FALSY

  // useEffect(refreshTweet, [retweeted, liked])

  function alreadyInteracted(type) {
    if (type === 0) {
      return tweet.interactions.likes.includes(context.user.id)
    }
    else if (type === 1) {
      return tweet.interactions.retweets.includes(context.user.id)
    }
  }

  const on_interaction = (type) => {
    console.log("1 PRESSED ON INTERACTION, TYPE: ", type);
    if (alreadyInteracted(type)) {
      console.log("2 ALREADY INTERACTED");
      deleteInteraction(type)
    }
    else {
      console.log("2 HAS NOT BEEN INTERACTED BEFORE");
      newInteraction(type)
    }
  }

  function newInteraction(type) {
    console.log("3 NEW INTERACTION, TYPE: ", type);
    const interaction = {
      type: type,
      tweet_id: tweet.id,
      interactor_user: { id: context.user.id, username: context.user.username },
      done_at: new Date(),
      content: { comment: null }
    }
    console.log("4 interaction object: ", interaction);
    console.log("5 sending via socket 'new-interaction'");
    context.socket.emit('new-interaction', interaction)
  }

  function deleteInteraction(type) {
    console.log("3 DELETE INTERACTIONS, TYPE:", type);
    const interaction = {
      type: type,
      tweet_id: tweet.id,
      interactor_user: { id: context.user.id, username: context.user.username },
      done_at: new Date(),
      content: { comment: null }
    }
    console.log("4 interaction object: ", interaction);
    console.log("5 sending via socket 'delete-interaction'");
    context.socket.emit('delete-interaction', interaction)
  }

  useEffect(() => {
    context.socket.on(`render-tweet-${tweet_.retweet ? tweet_.tweet_id : tweet_.id}`, _tweet_ => {

      console.log("12a render-tweet-", tweet_.retweet ? tweet_.tweet_id : tweet_.id, " received: ", _tweet_);
      setTweet(_tweet_.retweet ? _tweet_.tweet : _tweet_)

    })
  }, [])



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

            <div className={styles.iconNumberContainer} style={{ color: alreadyInteracted(1) && "#54CFA6" }}  >
              <div onClick={() => { on_interaction(1) }} className={styles.iconContainer}><i className='bi bi-recycle'></i></div>
              <span className={styles.number}>{tweet?.interactions?.retweets?.length}</span>
            </div>

            <div className={styles.iconNumberContainer} style={{ color: alreadyInteracted(0) && "#F91880" }}>
              <div onClick={() => { on_interaction(0) }} className={styles.iconContainer}><i className={`bi bi-heart${alreadyInteracted(0) ? "-fill" : ""}`}></i></div>
              <span className={styles.number}>{tweet?.interactions?.likes?.length}</span>
            </div>

            <div className={styles.iconNumberContainer}>
              <div onClick={() => {
                removeTweet(tweet_)
              }} className={styles.iconContainer}><i className='bi bi-upload'></i></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  
  )
}

// export default React.memo(Tweet)
