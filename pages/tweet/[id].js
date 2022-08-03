import Image from 'next/image'
import React, { useContext, useState } from 'react'
import styles from './tweet.module.css'
import { useRouter } from 'next/router'
import { Server } from './../../API';
import Context from '../../context'
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

  // const router = useRouter()
  // const context = useContext(Context)

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
    <div>SLM</div>
  )
}
