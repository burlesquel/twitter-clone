import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import Tweet from './tweet'
import { Oval } from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroller';
import { CSSTransition, TransitionGroup, TransitionStatus } from 'react-transition-group'

var key = 0
const keyGenerator = () => {
    key = key + 1
    return key
}

var limit = 20
var page = 0
// var page = 1


function Tweets({ query }) {

    const router = useRouter()
    const context = useContext(Context)
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(true)

    function addTweet(tweet) {
        const newArray = [tweet, ...tweets]
        setTweets(newArray)
    }
    function removeTweet(tweet) {
        console.log("removing tweet: ", tweet);
        console.log("original tweets before removing tweet: ", tweets);
        const newArray = tweets.filter(tweet_ => tweet_._id !== tweet._id)
        console.log("new array:", newArray);
        setTweets(newArray)
    }

    function refreshTweets(){
        setTweets([])
        Server.getTweets({ ...query, limit: limit, page: page_ * limit }).then(res => {
            setTweets(res.data);
        })
    }

    function handleLoadMore(page_) {
        console.log("getting more data, page:", page_);
        if (!loading) {
            setLoading(true);
            Server.getTweets({ ...query, limit: limit, page: page_ * limit }).then(res => {
                setHasNextPage(res.data.length !== 0);
                setTweets([...tweets, ...res.data]);
                setLoading(false);
            })
        }
    }

    useEffect(refreshTweets,[query])

    // useEffect(() => {
    //     handleLoadMore(0)
    // }, [])

    useEffect(() => {
        context.socket.on("delete-tweet", tweet => {
            removeTweet(tweet)
        })
        context.socket.on("new-tweet", tweet => {
            addTweet(tweet)
        })
        return () => {
            context.socket.off("delete-tweet")
            context.socket.off("new-tweet")
        }
    }, [tweets])

    console.log("TWEETS ", tweets);

    if (tweets.length !== 0) {
        return (


            <div style={{ minHeight: "100vh" }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleLoadMore}
                    hasMore={hasNextPage}
                    loader={<div style={{ display: "flex", justifyContent: "center", padding: "1rem", width: "100%" }}>
                        <Oval
                            color='#1DA1F2'
                            secondaryColor='#74c1f1'
                            width={"3rem"}
                            height={"3rem"} />
                    </div>}>
                    <TransitionGroup>
                        {tweets.map(
                            tweet => {
                                return (
                                    <CSSTransition
                                        timeout={300}
                                        classNames={"tweetAnimation"}
                                        key={`${tweet._id}-rt`}>
                                        <Tweet
                                            removeTweet={removeTweet}
                                            key={`${tweet._id}-rt`}
                                            tweet_={tweet} />
                                    </CSSTransition>
                                )
                            }
                        )}
                    </TransitionGroup >
                </InfiniteScroll>
            </div>



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

export default React.memo(Tweets)