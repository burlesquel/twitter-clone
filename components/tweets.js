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

    useEffect(refreshTweets, [context.user, router])
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
                tweet => <Tweet key={keyGenerator()} tweet={tweet} />
            )}
        </>
    )
}
