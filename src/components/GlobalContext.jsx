import { createContext, useState } from "react"
import { Outlet } from "react-router"

export const GlobalContext = createContext()

export function GlobalContextProvider(props) {

    let [messages, setMessages] = useState([])
    let [user, setUser] = useState(null)
    let [balance, setBalance] = useState({
        gold: "",
        token: "",
    })
    let [soldiers, setSoldiers] = useState([])

    const reset = () => {
        setUser(null)
        setBalance({
            gold: "",
            token: "",
        })
        setSoldiers([])
    }

    return (
        <GlobalContext.Provider
            value={{reset, messages, setMessages, user, setUser, balance, setBalance, soldiers, setSoldiers}}>
            {props.children}
            <Outlet/>
        </GlobalContext.Provider>
    )
}