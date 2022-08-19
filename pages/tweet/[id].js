import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tweet.module.css";
import { useRouter } from "next/router";
import { Server } from "./../../API";
import Context from "../../context";
import authenticatedRoute from "../../components/authenticatedRoute";
import { getFormattedDate } from "../../utility/functions";
import InteractionButtons from "../../components/minimal/interactionButtons";

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
  const router = useRouter();
  const context = useContext(Context);
  const { id } = router.query;

  const [tweet, setTweet] = useState();

  useEffect(() => {
    Server.getTweets({ id: id })
      .then((res) => {
        console.log(res.data[0]);
        setTweet(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    context.socket.on(`render-tweet-${id}`, (_tweet_) => {
      console.log("RENDER TWEET: ", _tweet_);
      setTweet(_tweet_.retweet ? _tweet_.tweet : _tweet_)
    });
  }, []);

  if (tweet) {
    return (
      <div className={styles.main}>
        <div className={styles.tweet}>
          <div className={styles.profilePicAndDetails}>
            <div className={styles.profilePhoto}>
              {tweet?.user?.profile_photo_uri && (
                <Image
                  objectFit="cover"
                  layout="fill"
                  src={tweet.user.profile_photo_uri}
                />
              )}
            </div>
            <div className={styles.names}>
              <span>{tweet.user.name}</span>
              <span>{tweet.user.username}</span>
            </div>
          </div>
          <div className={styles.tweetContent}>
            <span>{tweet.content.text}</span>
          </div>
          <div className={styles.details}>
            <span>{getFormattedDate(tweet.created_at)}</span>
          </div>
        </div>
        <div className={styles.stats}>
          <span>
            <span style={{ color: "black", fontWeight: "bold" }}>
              {tweet.interactions.comments.length}
            </span>{" "}
            Comments
          </span>
          <span>
            <span style={{ color: "black", fontWeight: "bold" }}>
              {tweet.interactions.retweets.length}
            </span>{" "}
            Retweets
          </span>
          <span>
            <span style={{ color: "black", fontWeight: "bold" }}>
              {tweet.interactions.likes.length}
            </span>{" "}
            Likes
          </span>
        </div>
        <InteractionButtons
          style={{ justifyContent: "space-around" }}
          displayLabels={false}
          tweet={tweet}
        />
      </div>
    );
  } else {
    <div></div>;
  }
}

export default authenticatedRoute(Tweet, { pathAfterFailure: "/login" });
