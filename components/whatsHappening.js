import Image from 'next/image'
import React, { useContext, useRef, useState } from 'react'
import { Server } from '../API'
import Context from '../context'
import styles from './whatsHappening.module.css'
var tweet_text = null
export default function WhatsHappening() {
    const context = useContext(Context)
    const ref = useRef()
    
    const reg = /#[a-z0-9_]+/

    // const hashtagRecognizedTextHandler = (text) =>{
    //     setText(text.replace(reg, match => <p style={{color:"blue"}}>{match}</p>))
    // }

    const textHandler = (e) =>{
        if(e.currentTarget.textContent.length > 240){
            // do nothing
            e.currentTarget.textContent = tweet_text
        }
        else{
            tweet_text = e.currentTarget.textContent
            e.currentTarget.textContent = tweet_text
        }
    }

    const newTweet = () =>{
        console.log("text:", tweet_text);
        Server.newTweet(context.user.id, tweet_text).then(res=>{
            console.log("TWEET SENT: ",res.data);
            context.setUser(res.data)
            ref.current.textContent = ""
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
                {/* <input ref={ref} maxLength={240} onChange={(e)=>{tweet_text = e.target.value}} className={styles.input} placeholder="What's happening?" /> */}
                <p 
                ref={ref}
                contentEditable={"true"} 
                placeholder="What's happening?"
                onInput={textHandler} 
                style={{cursor:"text"}} 
                className={styles.input}></p>
            </div>
            <div onClick={newTweet} className={styles.button}>Tweet</div>
        </div>
    )
}
