import { createContext, useState } from "react"

export const GlobalContext = createContext()

export function GlobalContextProvider(props) {

    const anonymousUser = {
        username: "",
        email: "",
    }
    let [messages, setMessages] = useState([])
    let [user, setUser] = useState(null)
    let [balance, setBalance] = useState({
        gold: "",
        token: "",
    })
    let [soldiers, setSoldiers] = useState([])

    const refreshToken = async () => {

        const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh: `${localStorage.getItem('refresh')}`,
            })
        })

        if (response.status === 200) {
            const access = await response.json()
            localStorage.setItem('access', access.access)
            return true
        }
        return false
    }

    const get_user = async () => {

        const response = await fetch('http://127.0.0.1:8000/my/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
        })

        if (response.status === 200) {

            const user = await response.json()
            setUser(user)
            return true
        }
        return false
    }

    return (
        <GlobalContext.Provider
            value={{get_user, refreshToken, messages, setMessages, user, setUser, balance, setBalance, soldiers, setSoldiers }}>
            {props.children}
        </GlobalContext.Provider>
    )
}