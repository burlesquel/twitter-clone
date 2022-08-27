import Left from "./left"
import Right from "./right"
import styles from "./Layout.module.css"
import Head from "next/head"
import Center from "./center"
import { useContext } from "react"
import Context from "../../context"
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const context = useContext(Context)
  const router = useRouter()
  const currentRoute = router.pathname.split("/")
  console.log("currentRoute: ", currentRoute);
  return (
    <section className={styles.container}>
      {context.loggedIn ? <>
        <Left className={styles.leftMain} />
        <Center className={` ${currentRoute.includes("messages") ? styles.centerMessageScreen : styles.center}`} >
          {children}
        </Center>
        <Right className={styles.rightMain} />
      </>
        : children}
    </section>
  )
}
