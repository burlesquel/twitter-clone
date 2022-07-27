import React, { useContext } from 'react'
import Context from '../context'
import styles from './profileDetails.module.css'
import Image from 'next/image'
export default function ProfileDetails() {
    const context = useContext(Context)
    return (
        <div>
            <div className={styles.main}>
                <div className={styles.topSection}>

                </div>
                <div className={styles.bottomSection}>

                    <div className={styles.editButton}>
                        <span>Edit Profile</span>
                    </div>

                </div>
                <div className={styles.profilePic}>
                    <Image src={context?.user?.media?.profile_photo_uri ? context?.user?.media?.profile_photo_uri : "https://picsum.photos/200"} layout='fill' />
                </div>
            </div>
            <div className={styles.details}>

                <div>
                    <h3>{context?.user?.name}</h3>
                    <span>@{context?.user?.username}</span>
                </div>

                <span>
                    bio
                </span>

                <div>
                    location fln
                </div>
            </div>
        </div>
    )
}
