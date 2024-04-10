"use client"

import React, { useContext } from 'react'
import Link from 'next/link';
import UserContext from '@/context/userContext';
import { logout } from '@/services/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CustomNavbar = () => {
    const context = useContext(UserContext);
    const router = useRouter();
    console.log(context)

    async function doLogout(){
        try{
            const result = await logout();
            console.log(result);
            context.setUser(undefined);
            router.push('/')
        }catch(error){
            console.log(error);
            toast.error("Logout error",{
                position:"top-center"
            })
        }
    }

    return (
        <nav className='bg-blue-600 h-12 py-2 px-4 flex justify-between items-center'>
            <div className='brand'>
                <h1 className='text-2xl font-semibold'>
                    <Link href={'/'} className='hover:text-white'>Work Manager</Link>
                </h1>
            </div>
            <div>
                <ul className='flex space-x-5'>
                    {
                        context.user && (
                             <>
                                <li>
                                    <Link href={'/'} className='hover:text-white'>Home</Link>
                                </li>
                                <li>
                                    <Link href={'/add-task'} className='hover:text-white'>Add Task</Link>
                                </li>
                                <li>
                                    <Link href={'/show-tasks'} className='hover:text-white'>Show Tasks</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div>
                <ul className='flex space-x-5'>
                    {
                        context.user && (
                            <>
                                <li>
                                    <Link href={'/profile/user'} className='hover:text-white'>{context.user.name}</Link>
                                </li>
                                <li>
                                    <button onClick={doLogout} className='hover:text-white'>Logout</button>
                                </li>
                            </>
                        )
                    }
                    {
                        !context.user && (
                            <>
                                <li>
                                    <Link href={'/login'} className='hover:text-white'>Login</Link>
                                </li>
                                <li>
                                    <Link href={'/signup'} className='hover:text-white'>Signup</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default CustomNavbar