import React, { useContext, useState } from 'react'
import ProfileDetails from '../../components/profileDetails'
import styles from './Index.module.css'
import DynamicInput from '../../components/dynamicInput'
import authenticatedRoute from '../../components/authenticatedRoute'
import Context from '../../context'
import { Server } from '../../API'
import { useRouter } from 'next/router'
function Edit() {
    const router = useRouter()
    const context = useContext(Context)
    const [selectedMedia, setSelectedMedia] = useState({profile:context.user.media.profile_photo_uri, cover:context.user.media.cover_uri})
    return (
        <div className={styles.main}>
            <ProfileDetails self edit selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia}/>
            <form onSubmit={(e)=>{
                e.preventDefault()
                console.log("image state: ", selectedMedia);
                const {name, bio, location, website} = e.target
                const data = {
                    id:context.user.id,
                    name:name.value,
                    bio:bio.value,
                    location:location.value, 
                    website:website.value,
                    media:{
                        profile_photo_uri:selectedMedia.profile,
                        cover_uri:selectedMedia.cover
                    }
                }
                console.log(data);
                Server.updateUser(data).then(res=>{
                    if(res.data){
                        context.setUser(res.data)
                        router.push('/profile')
                    }
                }).catch(err=>{
                    console.log(err);
                })
                // Server.updateUser({id:context.user.id, name:name.value, bio:bio.value, location:location.value, website:website.value}).then(res=>{
                //     console.log("RESPONSE FROM UPDATEUSER:",res.data)
                //     context.setUser(res.data)
                // }).catch(err=>{
                //     console.log(err);
                // })
            }}>
                <DynamicInput value={context?.user?.name} themeChangeOnClick="light" theme="normal" name={"name"} placeholder={"Name"} required type={"text"} />
                <DynamicInput value={context?.user?.bio} themeChangeOnClick="light" theme="normal" name={"bio"} placeholder={"Bio"} type={"text"} />
                <DynamicInput value={context?.user?.location} themeChangeOnClick="light" theme="normal" name={"location"} placeholder={"Location"} type={"text"} />
                <DynamicInput value={context?.user?.website} themeChangeOnClick="light" theme="normal" name={"website"} placeholder={"Website"} type={"text"} />
                <button type='submit' className={styles.button}>Save</button>
            </form>
        </div>
    )
}

export default authenticatedRoute(Edit, { pathAfterFailure: "/login" })
