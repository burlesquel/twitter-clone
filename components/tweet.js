import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import styles from './tweet.module.css'
import { useRouter } from 'next/router'
import Context from '../context'
import { relativeTime } from '../utility/functions';
import InteractionButtons from './minimal/interactionButtons'


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

    <div onClick={()=>{router.push(`/tweet/${tweet.id}`)}} className={styles.container}>
      {tweet_.retweet && <span className={styles.retweeted_by}><i className='bi bi-recycle'></i> <span onClick={() => { router.push(`/profile/${tweet_.interactor_user?.username}`) }}> {tweet_.interactor_user?.username} retweeted</span></span>}
      <div className={styles.main}>

        <div onClick={goProfile} className={styles.profilePicture}>
          <Image objectFit='cover' src={tweet?.user?.profile_photo_uri ? tweet?.user?.profile_photo_uri : "https://picsum.photos/200"} layout="fill" />
        </div>

        <div className={styles.content}>
          <span > <span onClick={goProfile}>{tweet?.user?.name}</span>  <span onClick={goProfile}>@{tweet?.user?.username} · {relativeTime(new Date(tweet?.created_at).getTime())}</span></span>
          <span>{tweet?.content?.text}</span>
          <InteractionButtons alreadyInteracted={alreadyInteracted} on_interaction={on_interaction} tweet={tweet}/>
        </div>

      </div>
    </div>
  
  )
}

// export default React.memo(Tweet)
