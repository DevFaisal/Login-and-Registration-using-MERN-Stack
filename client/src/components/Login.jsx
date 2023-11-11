import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const showToastMessage = (message, isError = false) => {
        toast[isError ? "error" : "success"](message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleLogin = (e) => {
        e.preventDefault()
        if (email && password) {
            try {
                axios.post("http://localhost:8000/user/login", { email, password })
                    .then((res) => {
                        console.log(res.data)
                        showToastMessage("Login Successfully")
                    })
                    .catch((err) => {
                        console.log(err)
                        showToastMessage(err.response.data.message, true)
                    })
            }
            catch (err) {
                showToastMessage(err.data, true)
            }
        }
        else {
            showToastMessage("Enter the Credentials", true)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center">
                <div className="flex flex-col w-[500px] mt-20 h-auto p-10 bg-green-900 rounded-sm text-white">
                    <form onSubmit={handleLogin} className='flex flex-col gap-1' action="http://localhost:8000/user/login" method="post">
                        <h1 className='text-center text-3xl font-semibold'>Login Page</h1>
                        <div className='w-full h-0.5 my-3 bg-gray-200'></div>
                        <label className='font-semibold'>Email</label>
                        <input className='px-3 py-2 rounded-md text-gray-700 font-semibold' type="email" value={email} onChange={(e => setEmail(e.target.value))} />
                        <label className='font-semibold'>Password</label>
                        <input className='px-3 py-2 rounded-md text-gray-700' type="password" value={password} onChange={(e => setPassword(e.target.value))} />
                        <button className='bg-sky-200 px-4 py-3 rounded-md font-bold mt-10 text-black' type="submit">Login</button>
                    </form>
                    <Link className='text-center mt-3 text-sm' to={'/register'}>Register for a new User</Link>
                </div>
            </div>
        </>
    )
}

export default Login