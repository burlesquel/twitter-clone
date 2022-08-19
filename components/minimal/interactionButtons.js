import React, { useContext } from 'react'
import Context from '../../context';
import styles from "./interactionButtons.module.css"
export default function InteractionButtons({ tweet, displayLabels=true, ...props }) {
    const context = useContext(Context)
    
    function alreadyInteracted(type) {
        if (type === 0) {
          return tweet.interactions.likes.includes(context.user.id);
        } else if (type === 1) {
          return tweet.interactions.retweets.includes(context.user.id);
        }
      }
    
      const on_interaction = (type) => {
        if (alreadyInteracted(type)) {
          deleteInteraction(type);
        } else {
          newInteraction(type);
        }
      };
    
      function newInteraction(type) {
        console.log("3 NEW INTERACTION, TYPE: ", type);
        const interaction = {
          type: type,
          tweet_id: tweet.id,
          interactor_user: { id: context.user.id, username: context.user.username },
          done_at: new Date(),
          content: { comment: null },
        };

        context.socket.emit("new-interaction", interaction);
      }
    
      function deleteInteraction(type) {
        const interaction = {
          type: type,
          tweet_id: tweet.id,
          interactor_user: { id: context.user.id, username: context.user.username },
          done_at: new Date(),
          content: { comment: null },
        };
        context.socket.emit("delete-interaction", interaction);
      }
    return (
        <div {...props} className={styles.main}>
            <div>
                <div className={styles.iconContainer} onClick={(e) => {e.stopPropagation(); alert("Very soon :)") }}><i className='bi bi-chat'></i></div>
                {displayLabels && <span className={styles.number}>{tweet?.interactions?.comments?.length}</span>}
            </div>

            <div style={{ color: alreadyInteracted(1) && "#54CFA6" }}  >
                <div className={styles.iconContainer} onClick={(e) => {e.stopPropagation(); on_interaction(1) }}><i className='bi bi-recycle'></i></div>
                {displayLabels && <span className={styles.number}>{tweet?.interactions?.retweets?.length}</span>}
            </div>

            <div style={{ color: alreadyInteracted(0) && "#F91880" }}>
                <div className={styles.iconContainer} onClick={(e) => {e.stopPropagation(); on_interaction(0) }}><i className={`bi bi-heart${alreadyInteracted(0) ? "-fill" : ""}`}></i></div>
                {displayLabels && <span className={styles.number}>{tweet?.interactions?.likes?.length}</span>}
            </div>

            <div >
                <div onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation()

                }}><i className='bi bi-upload'></i></div>
            </div>
        </div>
    )
}
