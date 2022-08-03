import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Server } from '../../API'
import Context from '../../context'
import DynamicInput from '../dynamicInput'
import styles from './signIn_signUp.module.css'
import { Oval } from "react-loader-spinner"
function Popup({ children, onSubmit, setPopup }) {

    const closePopup = () => {
        setPopup(null)
    }

    return (
        <div className={styles.main}>
            <form onSubmit={onSubmit}
                className={`${styles.popup}`}>
                <i onClick={closePopup} className={`bi bi-x ${styles.closeButton}`}></i>
                <i style={{ alignSelf: "center", fontSize: "2rem" }} className='bi bi-twitter'></i>
                {children}
            </form>
        </div>
    )
}

function SignIn({ setPopup }) {
    const context = useContext(Context)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const signIn = (e) => {
        e.preventDefault()
        if(!loading){
            setLoading(true)
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
    }
    return (
        <Popup setPopup={setPopup} onSubmit={signIn}>
            <h1>Sign in</h1>
            <DynamicInput theme={"dark"} required type={"email"} name={"email"} placeholder={"Email"} />
            <DynamicInput theme={"dark"} required type={"password"} name={"password"} placeholder={"Password"} />
            <button type='submit' className={styles.button}>
                {loading ? <Oval
                    color='#9bd3f8'
                    secondaryColor='#ffffff'
                    width={"1.5rem"}
                    height={"1.5rem"} /> :
                    <span>Sign in</span>}
            </button>
        </Popup>
    )
}

function SignUp({ setPopup }) {
    const context = useContext(Context)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const signUp = (e) => {
        e.preventDefault()
        if(!loading){
            setLoading(true)
            const { email, password, username, name } = e.target
            console.log(email.value, password.value, username.value, name.value);
            Server.newUser(email.value, password.value, username.value, name.value).then(res => {
                console.log("SUCCESS:", res)
                localStorage.setItem("id", res.data.id)
                context.setUser(res.data)
                router.push("/home")
                context.setLoggedIn(true)
                setLoading(false)
            }).catch(err => {
                console.log("THERE IS AN ERROR: ", err.response.data);
                alert("There has been an error, please try later.")
                setLoading(false)
            })
        }
    }
    return (
        <Popup setPopup={setPopup} onSubmit={signUp}>
            <h1>Create your account</h1>
            <DynamicInput theme={"dark"} required type={"email"} name={"email"} placeholder={"Email"} />
            <DynamicInput theme={"dark"} required type={"password"} name={"password"} placeholder={"Password"} />
            <DynamicInput theme={"dark"} required name={"username"} placeholder={"Username"} />
            <DynamicInput theme={"dark"} required name={"name"} placeholder={"Name"} />
            <button type='submit' className={styles.button}>
                {loading ? <Oval
                    color='#9bd3f8'
                    secondaryColor='#ffffff'
                    width={"1.5rem"}
                    height={"1.5rem"} /> :
                    <span>Sign up</span>}

            </button>
        </Popup>
    )
}

export default function Main({ type, setPopup }) {
    if (type === "sign-in") {
        return (
            <SignIn setPopup={setPopup} />
        )
    }
    else if (type === "sign-up") {
        return (
            <SignUp setPopup={setPopup} />
        )
    }
    else {
        return <></>
    }
}