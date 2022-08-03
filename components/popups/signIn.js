import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Server } from '../../API'
import Context from '../../context'
import DynamicInput from '../dynamicInput'
import styles from './signIn_signUp.module.css'
import { Oval } from 'react-loader-spinner'

export default function SignIn({ setPopup }) {
    const context = useContext(Context)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const signIn = (e) => {
        setLoading(true)
        e.preventDefault()
        const { email, password } = e.target
        console.log(email.value, password.value);
        Server.getUser({ email: email.value, password: password.value }).then(res => {
            if (res.data.length > 0) {
                const user = res.data[0]
                console.log("SUCCESS LOGIN:", res.data[0])
                localStorage.setItem("id", user.id)
                context.setUser(user)
                router.push("/home")
                context.setLoggedIn(true)
                setLoading(false)
            }
            else {
                alert("Wrong email or password.")
                setLoading(false)
            }
        }).catch(err => {
            console.log("THERE IS AN ERROR: ", err.response.data);
            alert("There has been an error, please try later.")
            setLoading(false)
        })
    }

    const closePopup = () => {
        setPopup(null)
    }

    return (
        <div className={styles.main}>
            <form onSubmit={signIn}
                className={`${styles.signUp} ${styles.popup}`}>
                <i onClick={closePopup} className={`bi bi-x ${styles.closeButton}`}></i>
                <i style={{ alignSelf: "center", fontSize: "2rem" }} className='bi bi-twitter'></i>
                <h1>Sign in</h1>
                <DynamicInput theme={"dark"} required type={"email"} name={"email"} placeholder={"Email"} />
                <DynamicInput theme={"dark"} required type={"password"} name={"password"} placeholder={"Password"} />
                <button type='submit' className={styles.button}>
                    {loading ? <Oval
                        color='#9bd3f8'
                        secondaryColor='#ffffff'
                        width={"1rem"}
                        height={"1rem"} /> :
                         <span>Sign in</span>}

                </button>
            </form>
        </div>
    )
}
