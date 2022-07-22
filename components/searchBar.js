import React from 'react'
import styles from "./searchBar.module.css"
export default function SearchBar({className}) {
    // BGC : #EFF3F4
    return (
        <div className={`${styles.main} ${className}`}>
            <i className={`bi bi-search`}></i>
            <input placeholder="Search Twitter"/>
        </div>
    )
}
