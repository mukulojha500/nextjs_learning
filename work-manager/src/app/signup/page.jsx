"use client"

import React, { useEffect, useState } from "react";
import signupSVG from '../../assets/undraw_undraw_sign_up_ln1s_-1-_s4bc.svg'
import Image from 'next/image'
import { signUp } from "@/services/userService";
import { toast } from 'react-toastify'


const metadata = {
    title: "Signup: Work Manager"
}

const SignUpPage = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: "https://image.com/",
    })

    useEffect(() => {
        document.title = metadata.title;
    }, [])

    const doSignup = async (event) => {
        event.preventDefault();
        //validation required

        try {
            const result = await signUp(data);
            toast.success("User is registered", {
                position: "top-center"
            })
            setData({
                name: "",
                email: "",
                password: "",
                about: "",
                profileURL: "https://image.com/",
            })
        } catch (error) {
            console.log(error)
            toast.error("Signup error", {
                position: "top-center"
            })
        }
    }

    const resetForm = () => {
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
            profileURL: "https://image.com/",
        })
    }

    return (
        <div className="grid grid-col-12 justify-center">
            <div className="col-span-6 col-start-4">
                <div className="py-5">
                    <div className="flex justify-center m-5">
                        <Image src={signupSVG} alt='signup' style={{ width: "40%" }} />
                    </div>
                    <h1 className="text-3xl text-center">Signup Here</h1>
                    <form action="#!" className="mt-5">
                        <div className="mt-3">
                            <label htmlFor="user_name" className='block text-sm font-medium mb-2'>User Name</label>
                            <input type="text" className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_name"
                                name="user_name"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        name: event.target.value,
                                    })
                                }}
                                value={data.name}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="user_email" className='block text-sm font-medium mb-2'>User Email</label>
                            <input type="email" className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_email"
                                name="user_email"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        email: event.target.value,
                                    })
                                }}
                                value={data.email}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="user_password" className='block text-sm font-medium mb-2'>User Password</label>
                            <input type="password" className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_password"
                                name="user_password"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        password: event.target.value,
                                    })
                                }}
                                value={data.password}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="user_about" className='block text-sm font-medium mb-2'>User About</label>
                            <textarea className="w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800" placeholder="Enter here" id="user_about" rows={5}
                                name="user_about"
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        about: event.target.value,
                                    })
                                }}
                                value={data.about}
                            ></textarea>
                        </div>
                        <div className="mt-3 text-center">
                            <button type="submit" className="bg-green-400 py-2 px-3 rounded-lg hover:bg-green-600" onClick={doSignup}>Signup</button>
                            <button type="button" className="bg-orange-400 py-2 px-3 rounded-lg hover:bg-orange-600 ms-3" onClick={resetForm}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage