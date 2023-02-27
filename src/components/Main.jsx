import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function Main(){
    const context = useContext(GlobalContext)
    
    let [userData,setUserData] = useState({username: "", password: ""})
    
    const get_data = async () => {
        const data = await fetch("http://127.0.0.1:8000/main/",{credentials: 'include'},options)
        const dataJson = await data.json()
        setUserData(dataJson)
    }

    get_data();

    return (
        <p>{`Esta es la cuenta de ${userData.username}.`}</p>
    )
}

