import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { Server } from '../api'
import authenticatedRoute from '../components/authenticatedRoute'
import Tweet from '../components/tweet'
import WhatsHappening from '../components/whatsHappening'
import Context from '../context'
import styles from '../styles/Home.module.css'

function Home() {
  const context = useContext(Context)

  const [tweets, setTweets] = useState([])

  const refreshTweets = () =>{
    console.log("refreshing tweets..");
    Server.getTweets().then(res => {
      console.log("getTweets res:",res);
      if (res) {
        setTweets(res)
        console.log(res);
      }
    })
  }

  useEffect(()=>{
    const int = setInterval(refreshTweets, 300000)

    return ()=>{
      clearInterval(int)
    }
  },[])

  useEffect(() => {
    refreshTweets()
  }, [context.user])
  

  return (
    <div className={styles.container}>
      <WhatsHappening />
      {tweets && tweets.length > 0 && tweets.map(tweet => {
        return (
          <Tweet
            content={{ text: tweet?.content?.text }}
            interactions={{
              comments: tweet?.interactions?.retweets?.length,
              likes: tweet?.interactions?.likes?.length,
              retweets:tweet?.interactions?.retweets?.length
            }}
            name={tweet?.user?.name}
            username={tweet?.user?.username}
            profile_pic_uri={tweet?.user?.profile_photo_uri}
          />
        )
      })}
    </div>
  )
}

export default authenticatedRoute(Home, { pathAfterFailure: "/login" })
