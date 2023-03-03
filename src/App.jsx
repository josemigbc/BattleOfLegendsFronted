import { useContext, useEffect, useState } from 'react'
import { Forms } from "./components/Forms";
import './App.css'
import { RegisterForm } from './components/RegisterForm';
import { Main } from "./components/Main";
import { GlobalContext } from './components/GlobalContext';

function App() {
  //Get the global context
  let context = useContext(GlobalContext)
  //set the user in global context
  const get_user_authenticated = async () => {
    //verify if access token exists
    if (localStorage.getItem('access')) {

      const response = await context.get_user()
      //try to refresh the access token if it is invalid.
      if (!response) {

        const responseToken = await context.refreshToken()
        //set user with the refreshed token or nothing
        if (responseToken) {
          await context.get_user()
        }
      }
    }
  }

  useEffect(() => { get_user_authenticated() }, [])

  if (context.user) return <Main />

  return <Forms/>

}

export default App
