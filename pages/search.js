import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import authenticatedRoute from '../components/authenticatedRoute'
import Tweet from '../components/tweet'
import styles from '../styles/Search.module.css'
function Search() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {id, q} = router.query 
    if(id === undefined || q === undefined){
        router.push("/explore")
        return <div></div>
    }
    // useEffect(()=>{
    //     if(router.asPath.split("/").includes("search")){
    //         if(router.query)
    //     }
    // },[])
    else{
        if(loading){
            return(
                <div>LOADING</div>
            )
        }
        else{
            return(
            <div className={styles.main}>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>    
                <Tweet/>
            </div>
        )
        }
    }
}

export default authenticatedRoute(Search, {pathAfterFailure:"/login"})
