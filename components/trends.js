import React from 'react'
import styles from './trends.module.css'
import Link from "next/link"

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


const Trend = ({ category = "", name = "", tweets = 0, id = "" }) => {
    return (
        <Link href={`/trend/${id}`}>
            <div className={styles.eachTrend}>
                <span>{category} · Trending</span>
                <span>{name}</span>
                <span>{tweets} tweets</span>
            </div>
        </Link>
    )
}

export default function Trends() {
    return (
        <div className={styles.main}>
            <h2>Trends for you</h2>
            {mockTrends.map(trend => {
                return (
                    <Trend 
                    key={trend.id}
                    tweets={trend.tweets}
                    name={trend.name} 
                    id={trend.id} 
                    category={trend.category}/>
                )
            })}
        </div>
    )
}
