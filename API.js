import axios from "axios";
const api_url = "https://twtr-clone-server.herokuapp.com"

const Server = {
    newUser: async (email, password, username, name) => {
        return await axios.post(`${api_url}/users`, { email, password, username, name })
    },
    getUser:async(query) =>{
        return await axios.get(`${api_url}/users`, {params:query})
    },
    getTweets: async () => {
        return await axios.get(`${api_url}/tweets`).then(res => {
            if (res.status) {
                return res.data
            }
            else {
                return false
            }
        })
    },
    newTweet: async(user_id, text) =>{
        return await axios.post(`${api_url}/tweets`, {user_id, text})
    }
}



export { Server }