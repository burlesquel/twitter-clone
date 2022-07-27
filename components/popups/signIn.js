import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Server } from '../../api'
import Context from '../../context'
import DynamicInput from '../dynamicInput'
import styles from './General.module.css'
export default function SignIn() {
    const context = useContext(Context)
    const router = useRouter()
    const signIn = (e) => {
        e.preventDefault()
        const { email, password} = e.target
        console.log(email.value, password.value);
        Server.getUser({email:email.value, password:password.value}).then(res => {
            if(res.data.length > 0){
                const user = res.data[0]
                console.log("SUCCESS LOGIN:", res.data[0])
                localStorage.setItem("id", user.id)
                context.setUser(user)
                router.push("/home")
                context.setLoggedIn(true)
            }
            else{
                alert("Wrong email or password.")
            }
        }).catch(err => {
            console.log("THERE IS AN ERROR: ", err.response.data);
            alert(err.response.data.join(' '))
        })
    }
    return (
        <div className={styles.main}>
            <form onSubmit={signIn}
                className={`${styles.signUp} ${styles.popup}`}>
                <h1>Create your account</h1>
                <DynamicInput required type={"email"} name={"email"} placeholder={"Email"} />
                <DynamicInput required type={"password"} name={"password"} placeholder={"Password"} />
                <button type='submit' className={styles.button}>
                    <span>Sign in</span>
                </button>
            </form>
        </div>
    )
}
