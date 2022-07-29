import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Server } from "../../API";
Server
import Context from "../../context";

const authenticatedRoute = (Component = null, options = {}) => {

    function AuthenticatedRoute() {
        const context = useContext(Context)
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (context.loggedIn) {
                setLoading(false)
            }
            else {
                Router.push(options.pathAfterFailure || "/login")
            }
        }, [context.loggedIn])

        useEffect(() => {
            const id = localStorage.getItem("id")
            if (id && id != "undefined" && id != undefined) {
                console.log("ID FOUND: ", id);
                Server.getUser({ id: id }).then(res => {
                    const user = res.data[0]
                    if(user){
                        console.log("USER FOUND: ", res.data[0]);
                        context.setUser(res.data[0])
                        context.setLoggedIn(true)
                    }
                    else{
                        console.log("COULDNT FIND ANY USER WITH THE FOLLOWING ID:", id);
                        context.setLoggedIn(false)
                        context.setUser(null)
                        localStorage.clear()
                    }
                }).catch(err => {
                    console.log("COULDNT FIND ANY USER WITH THE FOLLOWING ID:", id);
                    context.setLoggedIn(false)
                    context.setUser(null)
                    localStorage.clear()
                })
            }
            else {
                console.log("COULDNT FIND ANY ID");
                context.setLoggedIn(false)
                context.setUser(null)
                localStorage.clear()
            }

        }, [])

        if (loading) {
            return <div>LOADING</div>
        }

        return <Component />
    }

    return AuthenticatedRoute;
};


export default authenticatedRoute;