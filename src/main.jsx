import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalContext, GlobalContextProvider } from "./components/GlobalContext";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RegisterForm } from './components/RegisterForm'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <GlobalContextProvider></GlobalContextProvider>,
      children:[
        {
          path: "/",
          element: <App/>,
        },
        {
          path: "register/",
          element: <RegisterForm/>
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
