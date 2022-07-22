import Head from 'next/head'
import Image from 'next/image'
import Tweet from '../components/tweet'
import WhatsHappening from '../components/whatsHappening'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <WhatsHappening />
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  )
}
