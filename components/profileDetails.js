import React, { useContext, useRef } from 'react'
import Context from '../context'
import styles from './profileDetails.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Server } from '../API'

export default function ProfileDetails({ self, edit, selectedMedia, setSelectedMedia }) {
    const context = useContext(Context)
    const profile_picker = useRef()
    const cover_picker = useRef()

    function uploadImage(e){
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function(){
            console.log(reader.result);
            Server.uploadImage(reader.result).then(res=>{
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
        }

    }

    return (
        <div>
            {self && edit && <div style={{display:"none"}}>
            <input ref={profile_picker} onChange={uploadImage} type={"file"} accept="image/*"></input>
            <input ref={cover_picker} onChange={uploadImage} type={"file"} accept="image/*"></input>
            </div>}
            <div className={styles.main}>
                <div style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")' }} className={styles.topSection}>
                    {self && edit && <div className={styles.topIcon}>
                        <i onClick={()=>{console.log(cover_picker.current); cover_picker.current.click()}} className={`bi bi-camera`}></i>
                        <i className={`bi bi-x`}></i>
                    </div>}
                </div>
                <div className={styles.bottomSection}>

                    {self && !edit && <Link href={"/profile/edit"}>
                        <div className={styles.editButton}>
                            <span>Edit Profile</span>
                        </div>
                    </Link>}

                </div>
                <div className={styles.profilePic}>
                    <Image className={styles.image} src={context?.user?.media?.profile_photo_uri ? context?.user?.media?.profile_photo_uri : "https://picsum.photos/200"} layout='fill' />
                </div>
            </div>

            {!edit && <div className={styles.details}>

                <div>
                    <h3>{context?.user?.name}</h3>
                    <span>@{context?.user?.username}</span>
                </div>

                <span>
                    bio
                </span>

                <div>
                    <span><i className='bi bi-geo-alt'></i>  Türkiye</span>
                    <span><i className='bi bi-balloon'></i>  Born July 24, 1999</span>
                    <span><i className='bi bi-calendar3'></i>  Joined October 2012</span>
                </div>

                <div>
                    <span><b style={{ color: "black" }}>{context?.user?.interactions?.followings?.length}</b> <span style={{ fontSize: "small" }}>Followings</span></span>
                    <span><b style={{ color: "black" }}>{context?.user?.interactions?.followers?.length}</b> <span style={{ fontSize: "small" }}>Followers</span></span>
                </div>
            </div>}

        </div>
    )
}
