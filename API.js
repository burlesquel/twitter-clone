import axios from "axios";
const api_url = "https://twtr-clone-server.herokuapp.com"
// const api_url = "http://localhost:5000"


const Server = {
    newUser: async (email, password, username, name) => {
        return await axios.post(`${api_url}/users`, { email, password, username, name })
    },
    getUser: async (query) => {
        return await axios.get(`${api_url}/users`, { params: query })
    },
    updateUser: async (data) => {
        return await axios.put(`${api_url}/users`, data)
    },
    getTweets: async (query) => {
        return await axios.get(`${api_url}/tweets`, { params: query })
    },
    newTweet: async (user_id, text) => {
        return await axios.post(`${api_url}/tweets`, { user_id, text })
    },
    getTrends: async (query) => {
        return await axios.get(`${api_url}/trends`, { params: query })
    },
    uploadImage : async(file) =>{
        return await axios.post(`${api_url}/images`, {image:file})
    }
}

const entranceAlghorithm = async (context, localStorage, Router) => {
    const id = localStorage.getItem("id")
    if (id && id != "undefined" && id != undefined) {
        console.log("ID FOUND: ", id);
        Server.getUser({ id: id }).then(res => {
            const user = res.data[0]
            if (user) {
                console.log("USER FOUND: ", res.data[0]);
                context.setUser(res.data[0])
                context.setLoggedIn(true)
            }
            else {
                console.log("COULDNT FIND ANY USER WITH THE FOLLOWING ID:", id);
                context.setLoggedIn(false)
                context.setUser(null)
                localStorage.clear()
                Router.push("/login")
            }
        }).catch(err => {
            console.log("COULDNT FIND ANY USER WITH THE FOLLOWING ID:", id);
            context.setLoggedIn(false)
            context.setUser(null)
            localStorage.clear()
            Router.push("/login")
        })
    }
    else {
        console.log("COULDNT FIND ANY ID");
        context.setLoggedIn(false)
        context.setUser(null)
        localStorage.clear()
        Router.push("/login")
    }
}



export { Server, entranceAlghorithm }