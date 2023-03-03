import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function Forms(){
    
    let [login,setLogin] = useState(true)

    if (login) return <LoginForm setLoginForm={setLogin}/>
    return <RegisterForm setLoginForm={setLogin}/>
}