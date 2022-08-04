import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import Tweet from './tweet'
import { Oval } from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

var key = 0
const keyGenerator = () => {
    key = key + 1
    return key
}

var limit = 20
var page = 20

export default function Tweets({ query }) {

    const router = useRouter()
    const context = useContext(Context)
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [dataLength, setDataLength] = useState(20)
    // YOU CAN CREATE A WAITING STATE
    // console.log("router.pathname: ", router.pathname);
    // console.log("router.aspath: ", router.asPath);
    // console.log("router.basePath: ", router.basePath);

    const getTweets = (setLoadingTrue = false, paginated = false) => {

        setLoadingTrue && setLoading(true)

        if (paginated) {
            Server.getTweets({ ...query, limit: limit, page: page }).then(res => {
                if (res.data.length === 0) {
                    setHasMore(false)
                    setDataLength(0)
                    setLoading(false)
                }
                else {
                    setHasMore(true)
                    setDataLength(res.data.length)
                    setTweets(tweets.concat(res.data))
                    setLoading(false)
                }

                page = page + limit

            }).catch(err => {
                // ERROR ALGHORITM
                console.log("ERROR WHILE GETTING TWEETS: ", err);
                setLoading(false)
            })

        }
        else {
            Server.getTweets({ ...query, limit: 20, page: 0 }).then(res => {
                setHasMore(false)
                setDataLength(0)
                setTweets(res.data)
                setLoading(false)
            }).catch(err => {
                // ERROR ALGHORITM
                console.log("ERROR WHILE GETTING TWEETS: ", err);
                setHasMore(false)
                setDataLength(0)
                setLoading(false)
            })
        }
        

        console.log("refreshing tweets with: ", query);
        console.log("getting tweets with the page of ", page);
    }

    useEffect(() => { getTweets(true, false) }, [])
    useEffect(() => { getTweets(false, false) }, [router])


    if (!loading) {
        return (
            <InfiniteScroll
                dataLength={dataLength}
                endMessage={<span></span>}
                hasMore={hasMore}
                next={() => { getTweets(false, true) }}
                loader={
                    <div style={{ display: "flex", justifyContent: "center", padding: "3rem", width: "100%" }}>
                        <Oval
                            color='#1DA1F2'
                            secondaryColor='#74c1f1'
                            width={"3rem"}
                            height={"3rem"} />
                    </div>
                }
            >

                {tweets.map(
                    tweet => {
                        if (tweet.retweet) {
                            return (
                                <Tweet retweet={true} key={keyGenerator()} tweet_={tweet} refreshTweets={getTweets} />
                            )
                        }
                        else {
                            return (
                                <Tweet tweet_={tweet} key={keyGenerator()} refreshTweets={getTweets} />
                            )
                        }
                    }
                )}

            </InfiniteScroll>

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
