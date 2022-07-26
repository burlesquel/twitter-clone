import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Server } from '../../API'
import Context from '../../context'
import DynamicInput from '../dynamicInput'
import styles from './signIn_signUp.module.css'
export default function SignUp() {
    const context = useContext(Context)
    const router = useRouter()
    const signUp = (e) => {
        e.preventDefault()
        const { email, password, username, name } = e.target
        console.log(email.value, password.value, username.value, name.value);
        Server.newUser(email.value, password.value, username.value, name.value).then(res => {
            console.log("SUCCESS:", res)
            localStorage.setItem("id", res.data.id)
            context.setUser(res.data)
            router.push("/home")
            context.setLoggedIn(true)
        }).catch(err => {
            console.log("THERE IS AN ERROR: ", err.response.data);
            alert(err.response.data.join(' '))
        })
    }
    return (
        <div className={styles.main}>
            <form onSubmit={signUp}
                className={`${styles.signUp} ${styles.popup}`}>
                <h1>Create your account</h1>
                <DynamicInput theme={"dark"} required type={"email"} name={"email"} placeholder={"Email"} />
                <DynamicInput theme={"dark"} required type={"password"} name={"password"} placeholder={"Password"} />
                <DynamicInput theme={"dark"} required name={"username"} placeholder={"Username"} />
                <DynamicInput theme={"dark"} required name={"name"} placeholder={"Name"} />
                <button type='submit' className={styles.button}>
                    <span>Sign up</span>
                </button>
            </form>
        </div>
    )
}
