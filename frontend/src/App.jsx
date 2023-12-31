import { useState } from 'react'
import { 
  createBrowserRouter, 
  RouterProvider, 
} from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import FormNote from './components/formNote/FormNote';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/formNote",
    element: <FormNote/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  }


])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
