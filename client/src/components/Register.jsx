import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
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

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            axios.post("http://localhost:8000/user/register", { name, email, password })
                .then((res) => {
                    showToastMessage(res.data.message);
                })
                .catch((err) => {
                    showToastMessage(err.response.data, true);
                });
        }
        else {
            showToastMessage("Enter the valid Credentials", true);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex justify-center">
                <div className="flex flex-col w-[500px] mt-20 h-auto p-10 bg-green-900 rounded-sm text-white">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                        <h1 className="text-center text-3xl font-semibold">
                            Registration Form
                        </h1>
                        <div className="w-full h-0.5 my-3 bg-gray-200"></div>
                        <label className="font-semibold">Name</label>
                        <input
                            className="px-3 py-2 rounded-md text-gray-700 font-semibold"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="font-semibold">Email</label>
                        <input
                            className="px-3 py-2 rounded-md text-gray-700 font-semibold"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="font-semibold">Password</label>
                        <input
                            className="px-3 py-2 rounded-md text-gray-700 font-semibold"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-sky-200 px-4 py-3 rounded-md font-bold mt-10 text-black"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                    <Link className="text-center mt-3 text-sm" to={"/login"}>
                        Already an User
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Register;
