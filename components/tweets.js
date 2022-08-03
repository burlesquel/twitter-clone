import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import Tweet from './tweet'
import { Oval } from 'react-loader-spinner'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

var key = 0
const keyGenerator = () => {
    key = key + 1
    return key
}

export default function Tweets({ query }) {
    const router = useRouter()
    const context = useContext(Context)
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)
    // YOU CAN CREATE A WAITING STATE

    const refreshTweets = (setLoadingTrue = false) => {
        setLoadingTrue && setLoading(true)
        console.log("refreshing tweets..");
        Server.getTweets(query).then(res => {
            setTweets(res.data.reverse())
            setLoading(false)
        }).catch(err => {
            // ERROR ALGHORITM
            setLoading(false)
        })
    }

    useEffect(() => { refreshTweets(true) }, [context.user])

    if (!loading) {
        return (

            <TransitionGroup>
                {tweets.map(
                    tweet => {
                        if (tweet.retweet) {
                            return (
                                <CSSTransition
                                    key={keyGenerator()}
                                    timeout={500}
                                    classNames="tweetAnimation"
                                >
                                    <Tweet retweet={true} tweet_={tweet} refreshTweets={refreshTweets} />
                                </CSSTransition>
                                
                            )
                        }
                        else {
                            return (
                                <CSSTransition
                                    key={keyGenerator()}
                                    timeout={500}
                                    classNames="tweetAnimation"
                                >
                                    <Tweet tweet_={tweet} refreshTweets={refreshTweets} />
                                </CSSTransition>

                            )
                        }
                    }
                )}

            </TransitionGroup>
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
