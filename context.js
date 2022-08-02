import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"


const Context = createContext({})

export const ContextProvider = ({ children }) => {
    const router = useRouter()
    
    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(null)
    const [currentDisplayedProfile, setCurrentDisplayedProfile] = useState(null)
    const [refresh, setRefresh] = useState()

    const context = {

        user:user,
        setUser:setUser,

        loggedIn:loggedIn,
        setLoggedIn:setLoggedIn,

        currentDisplayedProfile:currentDisplayedProfile,
        setCurrentDisplayedProfile:setCurrentDisplayedProfile,

        refresh:refresh,
        setRefresh:setRefresh

    }

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default Context