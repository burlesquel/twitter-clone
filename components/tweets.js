import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import Tweet from './tweet'

var key = 0
const keyGenerator= () =>{
  key = key + 1
  return key
}

export default function Tweets({ query }) {
    console.log(query);
    const router = useRouter()
    const context = useContext(Context)
    const [tweets, setTweets] = useState([])
    // YOU CAN CREATE A WAITING STATE

    const refreshTweets = () => {
        Server.getTweets(query).then(res => {
            setTweets(res.data.reverse())
        }).catch(err => {
            // ERROR ALGHORITM
        })
    }

    useEffect(refreshTweets, [context.user, router, context.refresh])
    useEffect(() => {
        const refreshTweetInterval = setInterval(() => {
            refreshTweets()
        }, 30000);
        return () => {
            clearInterval(refreshTweetInterval)
        }
    }, [])

    return (
        <>
            {tweets.map(
                tweet => {
                    if(tweet.retweet){
                        return(
                            <Tweet key={keyGenerator()} retweet={true} tweet_={tweet} />
                        )
                    }
                    else{
                        return(
                            <Tweet key={keyGenerator()} tweet_={tweet} />
                        )
                    }
                }
            )}
        </>
    )
}
