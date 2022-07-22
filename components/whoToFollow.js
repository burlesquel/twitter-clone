import React from 'react'
import ProfileBadge from './profileBadge'
import styles from './whoToFollow.module.css'
export default function WhoToFollow({ stick }) {
    return (
        <div className={`${styles.main}`}>
            <h2>Who to follow</h2>
            <ProfileBadge followable className={styles.eachProfile} />
            <ProfileBadge followable className={styles.eachProfile} />
            <ProfileBadge followable className={styles.eachProfile} />
        </div>
    )
}
