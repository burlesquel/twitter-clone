import { useEffect, useRef, useState } from "react";
import SearchBar from "../searchBar";
import Trends from "../trends";
import WhoToFollow from "../whoToFollow";

import styles from "./right.module.css"
export default function Right({ className }) {
  const [stick, setStick] = useState(false)
  useEffect(()=>{
    const listener = document.addEventListener("scroll",()=>{
      if(window.scrollY > 800){
        stick === false && setStick(true)
      }
      else{
        stick === true && setStick(false)
      }
    })
    return(
      document.removeEventListener("scroll", listener)
    )
  },[])
  return (
    <div className={className}>

      <div className={styles.main} style={{position: stick ? "sticky" : "", top: stick ? -800 : "unset"}}>

        <div className={styles.searchBarContainer}>{/*  FOR STICKY CONTAINER  */}
          <SearchBar />
        </div>

        <Trends />

        <WhoToFollow stick={stick} />

      </div>

    </div>
  )
}
