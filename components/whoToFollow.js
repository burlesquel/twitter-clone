import React, { useContext, useState, useEffect } from 'react'
import { Server } from '../API'
import Context from '../context'
import ProfileBadge from './profileBadge'
import styles from './whoToFollow.module.css'
import { Oval } from  'react-loader-spinner'

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
    const [users, setUsers] = useState(null)
    useEffect(() => {
      Server.getUser({}).then(res=>{
        setUsers(getMultipleRandom(res.data.filter(user => user.id != context.user.id), 3))
      }).catch(err=>{
        setUsers([])
      })
    }, [])
    
    if(users){
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
    else{
      return(
        <div style={{width:"70%", height:"10rem", backgroundColor:"#f7f9f9", display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <Oval 
            color='#1DA1F2'
            secondaryColor='#74c1f1'
            width={"3rem"}
            height={"3rem"}/>
        </div>
      )
    }
}
