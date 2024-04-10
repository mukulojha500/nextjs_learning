"use client"

import React, { useContext, useEffect, useState } from 'react'
import loginSVG from '../../assets/undraw_login_re_4vu2.svg'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { login } from '@/services/userService'
import { useRouter } from 'next/navigation'
import UserContext from '@/context/userContext'

const metadata = {
    title: "Login: Work Manager"
}

function Login() {

    const router = useRouter()

    const context = useContext(UserContext)

    useEffect(() => {
        document.title = metadata.title;
    }, [])

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const loginFormSubmitted = async (e) => {
        e.preventDefault();

        try {

            const result = await login(loginData)
            console.log(result);
            toast.success("Logged In",{
                position:"top-center"
            });
            context.setUser(result.user);
            router.push('/profile/user');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message , {
                position: "top-center"
            })
        }
    }

    return (
        <div className="grid grid-col-12 justify-center">
            <div className="col-span-6 col-start-4">
                <div className="py-5">
                    <div className="flex justify-center m-5">
                        <Image src={loginSVG} alt='signup' style={{ width: "40%" }} />
                    </div>
                    <h1 className="text-3xl text-center">Login Here</h1>
                    <form action="#!" onSubmit={loginFormSubmitted}>
                        <div className="mt-3">
                            <label htmlFor="user_email" className='block text-sm font-medium mb-2'>User Email</label>
                            <input type="email" className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_email"
                                name="user_email"
                                onChange={(event) => {
                                    setLoginData({
                                        ...loginData,
                                        email: event.target.value,
                                    })
                                }}
                                value={loginData.email}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="user_password" className='block text-sm font-medium mb-2'>User Password</label>
                            <input type="password" className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_password"
                                name="user_password"
                                onChange={(event) => {
                                    setLoginData({
                                        ...loginData,
                                        password: event.target.value,
                                    })
                                }}
                                value={loginData.password}
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <button type="submit" className="bg-green-400 py-2 px-3 rounded-lg hover:bg-green-600" >Login</button>
                            <button type="button" className="bg-orange-400 py-2 px-3 rounded-lg hover:bg-orange-600 ms-3" >Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
