import React from 'react'
import authenticatedRoute from '../components/authenticatedRoute'
import Trends from '../components/trends'
import Tweet from '../components/tweet'
import styles from '../styles/Explore.module.css'
function Explore() {
  return (
    <div className={styles.main}>
      <Trends/>
      <h2>What&apos;s happening?</h2>
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

export default authenticatedRoute(Explore, {pathAfterFailure:"/login"})
