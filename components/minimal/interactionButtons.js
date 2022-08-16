import React from 'react'
import styles from "./interactionButtons.module.css"
export default function InteractionButtons({ tweet, on_interaction, alreadyInteracted }) {
    return (
        <div className={styles.main}>
            <div>
                <div onClick={(e) => {e.stopPropagation(); alert("Very soon :)") }}><i className='bi bi-chat'></i></div>
                <span className={styles.number}>{tweet?.interactions?.comments?.length}</span>
            </div>

            <div style={{ color: alreadyInteracted(1) && "#54CFA6" }}  >
                <div onClick={(e) => {e.stopPropagation(); on_interaction(1) }}><i className='bi bi-recycle'></i></div>
                <span className={styles.number}>{tweet?.interactions?.retweets?.length}</span>
            </div>

            <div style={{ color: alreadyInteracted(0) && "#F91880" }}>
                <div onClick={(e) => {e.stopPropagation(); on_interaction(0) }}><i className={`bi bi-heart${alreadyInteracted(0) ? "-fill" : ""}`}></i></div>
                <span className={styles.number}>{tweet?.interactions?.likes?.length}</span>
            </div>

            <div >
                <div onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation()
                    removeTweet(tweet)
                }}><i className='bi bi-upload'></i></div>
            </div>
        </div>
    )
}
