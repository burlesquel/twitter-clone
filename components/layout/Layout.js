import Left from "./left"
import Right from "./right"
import styles from "./Layout.module.css"
import Head from "next/head"
import Center from "./center"
import { useContext } from "react"
import Context from "../../context"

export default function Layout({ children }) {
  const context = useContext(Context)
  return (
    <section className={styles.container}>
      {context.loggedIn ? <>
        <Left className={styles.leftMain} />
        <Center className={styles.center}>
          {children}
        </Center>
        <Right className={styles.rightMain} />
      </>
        : children}
    </section>
  )
}
