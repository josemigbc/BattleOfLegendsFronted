import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function Main() {

    const context = useContext(GlobalContext)

    const get_data = async () => {
        const response = await fetch("http://127.0.0.1:8000/balance/", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            }
        })
        const data = await response.json()
        context.setBalance(data)
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
                <button onClick={()=>{
                    localStorage.removeItem('access')
                    localStorage.removeItem('refresh')
                    context.setUser(null)
                }}>Log Out</button>
            </div>
        </div>
    )
}

