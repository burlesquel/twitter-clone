import Left from "./left"
import Right from "./right"
import styles from "./Layout.module.css"
export default function Layout({children}) {
  return (
    <section className={styles.container}>
        <Left className={styles.leftMain}/>
        <div className={styles.center}>
          {children}
        </div>
        <Right className={styles.rightMain}/>
    </section>
  )
}
