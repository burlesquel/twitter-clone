import Head from 'next/head'
import Image from 'next/image'
import CenterHeaderBar from '../centerHeaderBar'
import styles from "./center.module.css"

export default function Center({ className, children }) {
  return (
    <div className={className}>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons/twitter_bird.png" />
      </Head>
      <CenterHeaderBar/>
      <section className={styles.centerContent}>
        {children}
      </section>
    </div>
  )
}
