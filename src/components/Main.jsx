import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import settings from "./../settings.json"
import axios from "axios";

export function Main() {

    const context = useContext(GlobalContext)

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios.defaults.withCredentials = true

    const get_data = async () => {
        const response = await axios.get(`${settings.host}balance/`)
        context.setBalance(response.data)
    }
    
    const logout = async () => {
        await axios.get(`${settings.host}logout/`)
        context.reset()
    }

    useEffect(()=>{get_data()},[])

    return (
        <div>
            <div>
                <p>{context.user.username}</p>
            </div>
            <div>
                <p>{context.user.email}</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <p>{context.balance.token} Tokens</p>
                </div>
                <div className="col-md-6">
                    <p>{context.balance.gold} Gold</p>
                </div>
            </div>
            <div>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

