import { createContext, useState } from "react"

export const GlobalContext = createContext()

export function GlobalContextProvider(props){
    let [user, setUser] = useState({
        "username": "",
        "email": "",
    })

    let [view,setView] = useState("login")

    return (
        <GlobalContext.Provider value={{user,setUser,view,setView}}>
            {props.children}
        </GlobalContext.Provider>
    )
}