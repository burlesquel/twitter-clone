import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import styles from "./left.module.css"
import { useRouter } from "next/router"
import Link from "next/link"
import ProfileBadge from "../profileBadge"
import Context from "../../context"
const LeftItem = ({ icon_name, label, dir, className }) => {
  const router = useRouter()
  const currentPage = router.asPath.split("/").includes(dir)
  return (
    <div className={className}>
      <Link href={`/${dir}`}>
        <div>
          <i style={{ color: icon_name === "twitter" ? "#1DA1F2" : ""}}
            className={`bi bi-${icon_name}${(icon_name != "twitter" && icon_name != "hash") && currentPage ? '-fill' : ""}`}></i>
          {label && <span style={{ fontWeight: currentPage && "bolder" }}>
            {label}
          </span>}
        </div>
      </Link>
    </div>
  )
}

export default function Left({ className }) {

  // function setDisplayBySize() {
  //   console.log(window.innerWidth);
  //   if (window.innerWidth < 500) {
  //     setDisplay(false)
  //   }
  //   else {
  //     setDisplay(true)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("resize", setDisplayBySize)
  //   return () => {
  //     window.removeEventListener("resize", setDisplayBySize)
  //   }
  // }, [])

  // const [display, setDisplay] = useState(true)

  const context = useContext(Context)
  return (
    // width: 26%
    <nav className={className}>

      <div className={styles.nav}>
        <LeftItem className={` ${styles.twitterBird}`} icon_name={"twitter"} dir={"home"} />
        <LeftItem className={`${styles.leftItem}`} icon_name={"house"} label="Home" dir={"home"} />
        <LeftItem className={`${styles.leftItem}`} icon_name={"hash"} label="Explore" dir={"explore"} />
        <LeftItem className={`${styles.leftItem}`} icon_name={"bell"} label="Notifications" dir={"notifications"} />
        <LeftItem className={`${styles.leftItem}`} icon_name={"envelope"} label="Messages" dir={"messages"} />
        <LeftItem className={`${styles.leftItem} ${styles.hideOnMobile}`} icon_name={"bookmark"} label="Bookmarks" dir={"bookmarks"} />
        <LeftItem className={`${styles.leftItem} ${styles.hideOnMobile}`} icon_name={"list"} label="Lists" dir={"lists"} />
        <LeftItem className={`${styles.leftItem} ${styles.hideOnMobile}`} icon_name={"person"} label="Profile" dir={"profile"} />
        <LeftItem className={`${styles.leftItem} ${styles.hideOnMobile}`} icon_name={"three-dots"} label="More" dir={"more"} />
        <div className={`${styles.tweetButton} ${styles.hideOnMobile}`}>
          <Link href={"#"} >
            Tweet
          </Link>
        </div>
      </div>

      <ProfileBadge onClick={() => {
        localStorage.clear("id")
        context.setUser(null)
        context.setLoggedIn(false)
      }} user={context.user} className={`${styles.profileBadge} ${styles.hideOnMobile}`} />

    </nav>
  )
}
