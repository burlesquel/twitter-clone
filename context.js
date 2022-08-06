import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import io from 'socket.io-client';
// const socket = io("http://localhost:5000");
const socket = io("https://twtr-clone-server.herokuapp.com")

const Context = createContext({})

export const ContextProvider = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected!: ", socket.id);
        })

    }, [])


    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(null)
    const [currentDisplayedProfile, setCurrentDisplayedProfile] = useState(null)
    const [refresh, setRefresh] = useState()
    const context = {

        user: user,
        setUser: setUser,

        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,

        currentDisplayedProfile: currentDisplayedProfile,
        setCurrentDisplayedProfile: setCurrentDisplayedProfile,

        refresh: refresh,
        setRefresh: setRefresh,

        socket:socket

    }

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default Context