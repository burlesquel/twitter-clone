import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"


const Context = createContext({})

export const ContextProvider = ({ children }) => {
    const router = useRouter()
    

    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(null)

    const context = {

        user:user,
        setUser:setUser,

        loggedIn:loggedIn,
        setLoggedIn:setLoggedIn

    }

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export default Context