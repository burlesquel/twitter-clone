import React, { useContext, useEffect, useState } from 'react'
import styles from './trends.module.css'
import Link from "next/link"
import { Server } from '../API'
import Context from '../context'
import { useRouter } from 'next/router'

var key = 0
function keyGenerator() {
    key = key + 1
    return key
}

const mockTrends =
    [
        { category: "Politics", name: "Trump2020", tweets: 22041, id: "3sd1a3dads" },
        { category: "Movie", name: "Interstellar", tweets: 23241, id: "334fscdads" },
        { category: "Literature", name: "Animal Farm", tweets: 4324, id: "sda1sa5d4a6" },
        { category: "Sports", name: "Galatasaray", tweets: 313131, id: "546df44542" },
        { category: "News", name: "Queen", tweets: 12, id: "21132123sad321xz2" },
        { category: "Covid19", name: "#BanVaccines", tweets: 32323, id: "dsaloytfg1" },
        { category: "Climate", name: "Greta", tweets: 114415, id: "dsa54jy4" },
        { category: "Technology", name: "Tesla", tweets: 42332, id: "dknorucn24" },
        { category: "Health", name: "Lupus", tweets: 5524, id: "bnmdsf1df" },
        { category: "Politics", name: "#Merkel", tweets: 4342343, id: "636gre54" },
    ]

function randomCategory() {
    const categories = Array.from(mockTrends, trend => trend.category)
    return categories[Math.round(Math.random() * categories.length)]
}

const Trend = ({ category, name = "", tweetsNumber = 0 }) => {
    return (
        <Link href={{ pathname: "/search", query: { q: name.replace("#","") } }}>
            <div className={styles.eachTrend}>
                <span>{category} · Trending</span>
                <span>{name}</span>
                <span>{tweetsNumber} tweets</span>
            </div>
        </Link>
    )
}

export default function Trends({ classname }) {
    const router = useRouter()
    const context = useContext(Context)
    const [trends, setTrends] = useState([])
    const refreshTrends = () => {
        Server.getTrends().then(res => {
            setTrends(res.data.sort((a, b) => b.tweets.length - a.tweets.length))
        }).catch(err => {
            setTrends([])
        })
    }

    useEffect(() => {
        refreshTrends()
        const interval = setInterval(refreshTrends, 30000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(refreshTrends, [context.user, router])

    return (
        <div className={`${styles.main} ${classname}`}>
            <h2>Trends for you</h2>
            {trends.map(trend => {
                return (
                    <Trend
                        key={keyGenerator()}
                        tweetsNumber={trend.tweets.length}
                        name={trend.name}
                        category={randomCategory()} />
                )
            })}
        </div>
    )
}
