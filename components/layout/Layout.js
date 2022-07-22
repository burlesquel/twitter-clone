import Left from "./left"
import Right from "./right"
import styles from "./Layout.module.css"
import Head from "next/head"
import Center from "./center"

export default function Layout({ children }) {
  return (
    <section className={styles.container}>
      <Left className={styles.leftMain} />
      <Center className={styles.center}>
        {children}
      </Center>
      <Right className={styles.rightMain} />
    </section>
  )
}
