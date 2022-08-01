import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../context'
import styles from './../styles/Login.module.css'
import Image from 'next/image'
import SignUp from '../components/popups/signUp'
import SignIn from '../components/popups/signIn'
import { entranceAlghorithm } from '../API'
import Popup from '../components/popups/signIn_signUp'
export default function Login() {
  const context = useContext(Context)
  const router = useRouter()

  const [popup, setPopup] = useState(null)

  useEffect(() => {

    entranceAlghorithm(context, localStorage, router).then(res=>{

      if (context.loggedIn === true) {
        router.push("/home")
      }

    })

  }, [])

  if (context.loggedIn === true) {
    return (
      <div></div>
    )
  }
  else if(context.loggedIn === false){
    return (
      <div className={styles.main}>

        <Popup type={popup} setPopup={setPopup}/>

        <div className={styles.left}>
          <Image objectFit='contain' width={400} height={400} src='/icons/twitter_bird_white.png' />
        </div>

        <div className={styles.right}>

          <Image objectFit='contain' width={50} height={50} src='/icons/twitter_bird_white.png' />

          <h1>Happening now</h1>

          <div>
            <h2>Join Twitter today.</h2>
            <div onClick={() => { setPopup("sign-up") }} className={`${styles.buttonBox} ${styles.hoverBlue}`}>Sign up</div>
          </div>

          <div>
            <h3>Already have an account?</h3>
            <div onClick={() => { setPopup("sign-in") }} className={`${styles.buttonBox} ${styles.hoverTrans}`}>Sign in</div>
          </div>

        </div>
      </div>
    )
  }
  else{
    return(
      <div>WAITING..</div>
    )
  }
}