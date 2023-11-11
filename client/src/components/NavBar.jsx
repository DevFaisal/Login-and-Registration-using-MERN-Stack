import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <>
            <div className='flex justify-center gap-3 text-xl font-semibold bg-slate-300 p-3'>

                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={"/register"}> Register</NavLink>
            </div >
        </>
    )
}

export default NavBar