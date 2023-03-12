import { useContext, useEffect, useState } from 'react'
import './App.css'
import { LoginForm } from './components/LoginForm';
import { Main } from "./components/Main";
import { GlobalContext } from './components/GlobalContext';
import axios from "axios";
import settings from "./settings.json"
import { Outlet, parsePath } from 'react-router';

function App() {
  //Get the global context
  let context = useContext(GlobalContext)

  axios.defaults.xsrfCookieName = "csrftoken"
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
  axios.defaults.withCredentials = true

  //set the user in global context
  const get_user_authenticated = async () => {

    const response = await axios.get(`${settings.host}is-authenticated/`)
    if (response.status === 200){
      context.setUser(response.data)
    }
  }

  useEffect(() => { get_user_authenticated() }, [])

  

  if (context.user) return <Main/>

  return <LoginForm/>

}

export default App
