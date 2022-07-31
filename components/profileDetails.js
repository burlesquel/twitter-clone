import React, { useContext, useRef } from 'react'
import Context from '../context'
import styles from './profileDetails.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Server } from '../API'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]; 

export default function ProfileDetails({user, self, edit, selectedMedia, setSelectedMedia }) {
    const context = useContext(Context)
    const profile_picker = useRef()
    const cover_picker = useRef()

    const currentUser = user || context.user

    const created_date = currentUser?.created_at ? new Date(currentUser?.created_at) : new Date()

    function uploadImage(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function () {
            console.log(reader.result);
            Server.uploadImage(reader.result).then(res => {
                console.log(res.data);
                const type = e.target.name
                const newState = { ...selectedMedia }
                newState[type] = res.data.url
                setSelectedMedia(newState)
            }).catch(err => {
                console.log(err);
            })
        }

    }

    if (self && edit) {
        console.log("selected media: ", selectedMedia);
        return (
            <div>
                <div style={{ display: "none" }}>
                    <input ref={profile_picker} onChange={uploadImage} name="profile" type={"file"} accept="image/*"></input>
                    <input ref={cover_picker} onChange={uploadImage} name="cover" type={"file"} accept="image/*"></input>
                </div>
                <div className={styles.main}>
                    <div style={{ backgroundImage: `url("${selectedMedia.cover}")` }} className={styles.topSection}>
                        <div className={styles.topIcon}>
                            <i onClick={() => { console.log(cover_picker.current); cover_picker.current.click() }} className={`bi bi-camera`}></i>
                            <i className={`bi bi-x`}></i>
                        </div>
                    </div>
                    <div className={styles.bottomSection}>

                    </div>
                    <div style={{ backgroundImage: `url("${selectedMedia.profile}")` }} className={styles.profilePic}>
                        <div className={styles.bottomIcon}>
                        <i onClick={() => { console.log(cover_picker.current); profile_picker.current.click() }} className={`bi bi-camera`}></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
    else if((!edit && self) || (!edit && !self)) {
        return (
            <div>

                <div className={styles.main}>
                    <div style={{ backgroundImage: `url("${currentUser?.media?.cover_uri}")` }} className={styles.topSection}>
                    </div>
                    <div className={styles.bottomSection}>

                        {self && !edit && <Link href={"/profile/edit"}>
                            <div className={styles.editButton}>
                                <span>Edit Profile</span>
                            </div>
                        </Link>}

                    </div>

                    <div style={{ backgroundImage: `url("${currentUser?.media?.profile_photo_uri}")` }} className={styles.profilePic}>
                    </div>
                </div>

                {!edit && <div className={styles.details}>

                    <div>
                        <h3>{currentUser?.name}</h3>
                        <span>@{currentUser?.username}</span>
                    </div>

                    <span>
                    {currentUser?.bio ? currentUser?.bio : "Bio"}
                    </span>

                    <div>
                        <span><i className='bi bi-geo-alt'></i> {currentUser?.location ? currentUser?.location : "Location"}</span>
                        <span><i className='bi bi-balloon'></i>  Joined {String(monthNames[created_date.getMonth()])} {String(created_date.getFullYear())}</span>
                        {/* <span><i className='bi bi-calendar3'></i>  Joined October 2012</span> */}
                    </div>

                    <div>
                        <span><b style={{ color: "black" }}>{currentUser?.interactions?.followings?.length}</b> <span style={{ fontSize: "small" }}>Followings</span></span>
                        <span><b style={{ color: "black" }}>{currentUser?.interactions?.followers?.length}</b> <span style={{ fontSize: "small" }}>Followers</span></span>
                    </div>
                </div>}

            </div>
        )
    }

    else{
        return(
            <div>ERROR</div>
        )
    }

}
