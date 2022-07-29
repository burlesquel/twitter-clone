import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import authenticatedRoute from '../components/authenticatedRoute'
import Tweet from '../components/tweet'
import Tweets from '../components/tweets'
import styles from '../styles/Search.module.css'
function Search() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { q } = router.query

    if (q === undefined) {
        router.push("/explore")
        return <div></div>
    }
    else {
        if (loading) {
            return (
                <div>LOADING</div>
            )
        }
        else {
            return (
                <div className={styles.main}>
                    <Tweets query={{ hashtags: `#${q}` }} />
                </div>
            )
        }
    }

}

export default authenticatedRoute(Search, { pathAfterFailure: "/login" })
