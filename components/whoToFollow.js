import React, { useContext, useState, useEffect } from 'react'
import { Server } from '../api'
import Context from '../context'
import ProfileBadge from './profileBadge'
import styles from './whoToFollow.module.css'

var key = 0
const keyGenerator = () =>{
  key = key + 1
  return key
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

export default function WhoToFollow({ stick }) {
    const context = useContext(Context)
    const [users, setUsers] = useState([])
    useEffect(() => {
      Server.getUser({}).then(res=>{
        setUsers(getMultipleRandom(res.data.filter(user => user.id != context.user.id), 3))
      }).catch(err=>{

      })
    }, [])
    
    return (
        <div  className={`${styles.main}`}>
            {users.length === 0 ? <div> LOADING </div> : <>
                <h2>Who to follow</h2>
                {users.map(user=>{
                    return(
                        <ProfileBadge key={keyGenerator()} user={user} followable className={styles.eachProfile} />
                    )
                })}
            </>}
        </div>
    )
}
