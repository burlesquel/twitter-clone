import Image from 'next/image'
import React, { useContext, useState } from 'react'
import styles from './tweet.module.css'
import { useRouter } from 'next/router'
import { Server } from './../../API';
import Context from '../../context'
import { relativeTime } from '../../utility/functions';
import authenticatedRoute from '../../components/authenticatedRoute';

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

function Tweet() {
  const router = useRouter()
  const context = useContext(Context)
  const { id } = router.query


  // const [tweet, setTweet] = useState(tweet_?.tweet || tweet_) // IF IT IS A RETWEET, THE FIRST ONE WILL RETURN FALSY

  // const alreadyInteracted =
  //   [tweet.interactions?.likes?.includes(context.user.id),
  //   tweet.interactions?.retweets?.includes(context.user.id),
  //   tweet.interactions?.comments?.includes(context.user.id),]

  // const on_interaction = (type) => {
  //   if (alreadyInteracted[type]) {
  //     deleteInteraction(type)
  //   }
  //   else {
  //     newInteraction(type)
  //   }
  // }

  // const newInteraction = (type) => {

  //   Server.newInteraction(type, tweet.id, { id: context.user.id, username: context.user.username }, { id: tweet.user.id, username: tweet.user.id }, new Date(), {}).then(res => {
  //     refreshTweet()
  //     type === 1 && refreshTweets()
  //   }).catch(err => {
  //     console.log(err);
  //   })

  // }

  // const deleteInteraction = (type) => {

  //   Server.deleteInteraction(type, tweet.id, { id: context.user.id, username: context.user.username }).then(res => {
  //     refreshTweet()
  //     type === 1 && refreshTweets()
  //   }).catch(err => {
  //     console.log(err);
  //   })

  // }

  // function refreshTweet() {
  //   Server.getTweets({ id: tweet.id }).then(res => {
  //     setTweet(res.data[0])
  //   })
  // }


  // function goProfile() {
  //   router.push(`/profile/${tweet?.user?.username}`)
  // }
  return (
    // <div className={styles.container}>

    // </div>

    <div>{id}</div>

  )
}

export default authenticatedRoute(Tweet, { pathAfterFailure: "/login" })
