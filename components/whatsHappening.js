import Image from 'next/image'
import React from 'react'
import styles from './whatsHappening.module.css'
export default function WhatsHappening() {
    return (
        <div className={styles.main}>
            <div className={styles.inputAndPP}>
                <div className={styles.profileImage}>
                    <Image objectFit='contain' src={"https://pbs.twimg.com/profile_images/1514936411836850185/j1yCW-1V_bigger.jpg"} layout="fill" />
                </div>
                <input maxLength={240} className={styles.input} placeholder="What's happening?" />
            </div>
            <div className={styles.button}>Tweet</div>
        </div>
    )
}
