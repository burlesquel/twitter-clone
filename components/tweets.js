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


function Tweets({ query, profile_id }) {

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
        const newArray = tweets.filter(tweet_ => tweet_._id !== tweet._id)
        setTweets(newArray)
    }

    function refreshTweets(){
        setTweets([])
        Server.getTweets({ ...query, limit: limit, page: page_ * limit }).then(res => {
            setTweets(res.data);
        })
    }

    function handleLoadMore(page_, refresh = false) {
	setHasNextPage(false);
        if (!loading) {
            setLoading(true);
            Server.getTweets({ ...query, limit: limit, page: page_ * limit }).then(res => {
                setHasNextPage(res.data.length !== 0);
                refresh ? setTweets(res.data) : setTweets([...tweets, ...res.data]);
                setLoading(false);
            })
        }
    }

    useEffect(()=>{
        handleLoadMore(0, true)
    },[query])

    useEffect(() => {
        context.socket.on(`delete-tweet${profile_id ? `-${profile_id}` : ""}`, tweet => {
            removeTweet(tweet)
        })
        context.socket.on(`new-tweet${profile_id ? `-${profile_id}` : ""}`, tweet => {
            addTweet(tweet)
        })
        return () => {
            context.socket.off("delete-tweet")
            context.socket.off("new-tweet")
        }
    }, [tweets])

    if (tweets.length !== 0) {
        return (

            <div style={{ minHeight: "200vh", overflow:"auto" }}>
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