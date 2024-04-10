"use client"

import React from 'react'
import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className='h-40 bg-blue-600'>
            <div className='flex p-5 justify-around'>
                <div className='text-centerc flex flex-col justify-center items-center'>
                    <h1 className='text-3xl'>Welcome to Work manager</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem facilis recusandae, officiis quo voluptate vel.</p>
                </div>
                <div className='text-center'>
                    <h1>Important Links</h1>
                    <ul>
                        <li>
                            <Link href={'#!'} className='hover:text-white'>Facebook</Link>
                        </li>
                        <li>
                            <Link href={'#!'} className='hover:text-white'>Linkedin</Link>
                        </li>
                        <li>
                            <Link href={'#!'} className='hover:text-white'>Instagram</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
