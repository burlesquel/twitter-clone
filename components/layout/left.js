import Image from "next/image"
import { useState } from "react"
import styles from "./left.module.css"
import { useRouter } from "next/router"
import Link from "next/link"
import ProfileBadge from "../profileBadge"
const LeftItem = ({ icon_name, label, dir }) => {
  const router = useRouter()
  const currentPage = router.asPath.split("/").includes(dir)
  return (
    <Link href={`/${dir}`}>
      <div>
        <i style={{ color: icon_name === "twitter" ? "#1DA1F2" : "" }}
          className={`bi bi-${icon_name}${(icon_name != "twitter" && icon_name != "hash") && currentPage ? '-fill' : ""}`}></i>
        {label && <span style={{ fontWeight: currentPage && "bolder" }}>
          {label}
        </span>}
      </div>
    </Link>
  )
}

export default function Left({ className }) {
  return (
    // width: 26%
    <nav className={className}>

      <div className={styles.nav}>
        <LeftItem icon_name={"twitter"} dir={"home"} />
        <LeftItem icon_name={"house"} label="Home" dir={"home"} />
        <LeftItem icon_name={"hash"} label="Explore" dir={"explore"} />
        <LeftItem icon_name={"bell"} label="Notifications" dir={"notifications"} />
        <LeftItem icon_name={"envelope"} label="Messages" dir={"messages"} />
        <LeftItem icon_name={"bookmark"} label="Bookmarks" dir={"bookmarks"} />
        <LeftItem icon_name={"list"} label="Lists" dir={"lists"} />
        <LeftItem icon_name={"person"} label="Profile" dir={"profile"} />
        <LeftItem icon_name={"three-dots"} label="More" dir={"more"} />
        <div className={styles.tweetButton}>
          <Link href={"#"} >
            Tweet
          </Link>
        </div>
      </div>

      <ProfileBadge className={styles.profileBadge}/>

    </nav>
  )
}
