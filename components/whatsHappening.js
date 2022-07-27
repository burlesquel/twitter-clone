import Image from 'next/image'
import React, { useContext, useRef } from 'react'
import { Server } from '../api'
import Context from '../context'
import styles from './whatsHappening.module.css'
var tweet_text = null
export default function WhatsHappening() {
    const context = useContext(Context)
    const ref = useRef()

    const newTweet = () =>{
        Server.newTweet(context.user.id, tweet_text).then(res=>{
            console.log("TWEET SENT: ",res.data);
            context.setUser(res.data)
            ref.current.value = null
            tweet_text = null
        }).catch(err=>{
            console.log("ERROR", err);
        })
    }
    return (
        <div className={styles.main}>
            <div className={styles.inputAndPP}>
                <div className={styles.profileImage}>
                    <Image objectFit='contain' src={context?.user?.media?.profile_photo_uri ? context?.user?.media?.profile_photo_uri : "/icons/loading-spinner.gif"} layout="fill" />
                </div>
                <input ref={ref} maxLength={240} onChange={(e)=>{tweet_text = e.target.value}} className={styles.input} placeholder="What's happening?" />
            </div>
            <div onClick={newTweet} className={styles.button}>Tweet</div>
        </div>
    )
}
