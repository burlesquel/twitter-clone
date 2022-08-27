import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../searchBar";
import Trends from "../trends";
import WhoToFollow from "../whoToFollow";

import styles from "./right.module.css"

// WHICH COMPONENT MUST NOT BE DISPLAYED ON SOME PAGES
const hiddensOf = {
  trends: ["explore"],
  searchBar: ["explore", "search"],
}

const setStyleOfRightMain = (currentRoute = String, stick = Boolean) => {

  if (currentRoute === "explore") {
    // IF THE CURRENT ROUTE IS EXPLORE, ONLY DEPENDS ON CURRENT ROUTE
    return { position: "sticky", top: 0 }
  }
  else {
    // IF THE CURRENT ROUTE IS NOT EXPLORE, ONLY DEPENDS ON STICK STATE
    return {
      position: stick ? "sticky" : "", //
      top: stick ? -800 : "unset",
    }
  }
}

export default function Right({ className }) {

  const router = useRouter()
  const currentPage = router.pathname.split("/")[1]


  const [stick, setStick] = useState(false)

  useEffect(() => {
    const listener = document.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        stick === false && setStick(true)
      }
      else {
        stick === true && setStick(false)
      }
    })
    return (
      document.removeEventListener("scroll", listener)
    )
  }, [])

  return (
    <>
    { currentPage === "messages" ? null 
    :
    
      <div className={className}>

      <div className={styles.main} style={setStyleOfRightMain(currentPage, stick)}>

        {!hiddensOf.searchBar.includes(currentPage) &&
          <div className={styles.searchBarContainer}>{/*  FOR STICKY CONTAINER  */}
            <SearchBar />
          </div>}

        {!hiddensOf.trends.includes(currentPage) && <Trends classname={styles.trendsStyle}/>}

        <WhoToFollow stick={stick} />

      </div>

    </div>
    }
    </>
  )
}
