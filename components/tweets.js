import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import Tweet from './tweet'
import { Oval } from 'react-loader-spinner'

var key = 0
const keyGenerator = () => {
    key = key + 1
    return key
}

var loadingEffectOnInital = true

export default function Tweets({ query }) {
    const router = useRouter()
    const context = useContext(Context)
    const [tweets, setTweets] = useState(null)
    // YOU CAN CREATE A WAITING STATE
    // console.log("router.pathname: ", router.pathname);
    // console.log("router.aspath: ", router.asPath);
    // console.log("router.basePath: ", router.basePath);

    const refreshTweets = (setLoadingTrue = false) => {
        setLoadingTrue && setTweets(null)
        console.log("refreshing tweets with: ", query);
        Server.getTweets(query).then(res => {
            // console.log(Array.from(res.data, tweet=>{console.log(tweet.content.text);}));
            setTweets(res.data.reverse())
        }).catch(err => {
            // ERROR ALGHORITM
            console.log("ERROR WHILE GETTING TWEETS: ", err);
            setTweets(null)
        })
    }

    useEffect(() => { refreshTweets(true) }, [])
    useEffect(() => { refreshTweets(false) }, [router])


    if (tweets) {
        return (
            <>
                {tweets.map(
                    tweet => {
                        if (tweet.retweet) {
                            return (
                                    <Tweet retweet={true} key={keyGenerator()} tweet_={tweet} refreshTweets={refreshTweets} />
                            )
                        }
                        else {
                            return (
                                    <Tweet tweet_={tweet} key={keyGenerator()} refreshTweets={refreshTweets} />
                            )
                        }
                    }
                )}
                </>

        )
    }
    else {
        return (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "5rem", height: "100vh", width: "100%" }}>
                <Oval
                    color='#1DA1F2'
                    secondaryColor='#74c1f1'
                    width={"3rem"}
                    height={"3rem"} />
            </div>
        )
    }
}
