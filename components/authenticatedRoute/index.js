import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { entranceAlghorithm, Server } from "../../API";
import Context from "../../context";

const authenticatedRoute = (Component = null, options = {}) => {

    function AuthenticatedRoute() {
        const context = useContext(Context)

        useEffect(() => {
            
            entranceAlghorithm(context, localStorage, Router)
    
        }, [])
        
        if (context.loggedIn) {
            return <Component />
        }
        else if (context.loggedIn) {
            return <div>WAITING..</div>
        }
    }

    return AuthenticatedRoute;
};


export default authenticatedRoute;