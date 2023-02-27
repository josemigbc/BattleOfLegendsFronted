import { useContext, useState } from 'react'
import { LoginForm } from "./components/LoginForm";
import './App.css'
import { GlobalContext } from './components/GlobalContext';
import { RegisterForm } from './components/RegisterForm';
import { Main } from "./components/Main";

function App() {

  const context = useContext(GlobalContext)

  fetch("http://127.0.0.1:8000/home/")

  if (context.view == "login") {
    
    return (
      <div>
          <LoginForm />
      </div>
    )
  }
  
  if (context.view == "main") {
    return (
      <div className='m-3 p-2'>
        <div className='m-auto'>
          <Main/>
        </div>
      </div>
    )
  }

  if (context.view == "register") {
    return (
      <div>
        <RegisterForm/>
      </div>

    )
  }

}

export default App
