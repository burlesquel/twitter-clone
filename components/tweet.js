import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tweet.module.css";
import { useRouter } from "next/router";
import Context from "../context";
import { relativeTime } from "../utility/functions";
import InteractionButtons from "./minimal/interactionButtons";

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

export default function Tweet({ tweet_, removeTweet }) {
  const router = useRouter();
  const context = useContext(Context);

  const [tweet, setTweet] = useState(tweet_.retweet ? tweet_.tweet : tweet_); // IF IT IS A RETWEET, THE FIRST ONE WILL RETURN FALSY

  useEffect(() => {
    context.socket.on(
      `render-tweet-${tweet_.retweet ? tweet_.tweet_id : tweet_.id}`,
      (_tweet_) => {
        console.log(
          "12a render-tweet-",
          tweet_.retweet ? tweet_.tweet_id : tweet_.id,
          " received: ",
          _tweet_
        );
        setTweet(_tweet_.retweet ? _tweet_.tweet : _tweet_);
      }
    );
  }, []);

  function goProfile(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    router.push(`/profile/${tweet?.user?.username}`);
  }
  return (
    <div
      onClick={(e) => {
        router.push(`/tweet/${tweet.id}`);
      }}
      className={styles.container}
    >
      {tweet_.retweet && (
        <span className={styles.retweeted_by}>
          <i className="bi bi-recycle"></i>
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              router.push(`/profile/${tweet_.interactor_user?.username}`);
            }}
          >
            {" "}
            {tweet_.interactor_user?.username} retweeted
          </span>
        </span>
      )}
      <div className={styles.main}>
        <div onClick={goProfile} className={styles.profilePicture}>
          <Image
            objectFit="cover"
            src={
              tweet?.user?.profile_photo_uri
                ? tweet?.user?.profile_photo_uri
                : "https://picsum.photos/200"
            }
            layout="fill"
          />
        </div>

        <div className={styles.content}>
          <span>
            {" "}
            <span onClick={goProfile}>{tweet?.user?.name}</span>{" "}
            <span onClick={goProfile}>
              @{tweet?.user?.username} ·{" "}
              {relativeTime(new Date(tweet?.created_at).getTime())}
            </span>
          </span>
          <span>{tweet?.content?.text}</span>
          <InteractionButtons tweet={tweet} />
        </div>
      </div>
    </div>
  );
}

// export default React.memo(Tweet)
