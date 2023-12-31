import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'

const backendURL = import.meta.env.VITE_REACT_APP_URL_BACKEND

const Login = () => {
    const [error, setError] = useState(null)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            console.log(user)
            const res = await axios.post(`${backendURL}login`, user)
            if (res.status === 200) {
                window.location.replace('/home')
                window.localStorage.setItem('idUser', res.data.idUser)
            }
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }
    console.log(user)

  return (
    <div className='wrapper'>
        <form action=''>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username"
                onChange={handleChange}
                id="email" 
                required/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password"
                onChange={handleChange}
                id="password" 
                required/>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16M96 56a32 32 0 0 1 64 0v24H96Z"/></svg>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox"/>Remember me</label>
                <a href="">Forgot password?</a>
            </div>

            <button type='button' className='btn' onClick={handleClick}>Login</button>

            <div className="register-link">
                <p>Don't have an account? <a href="/register">Register now</a></p>
            </div>
        </form>
    </div>
  )
}

export default Login