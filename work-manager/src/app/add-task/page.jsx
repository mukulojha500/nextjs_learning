"use client"

import React, { useEffect, useState } from 'react'
import formSVG from '../../assets/undraw_diary_re_4jpc.svg'
import Image from 'next/image'
import { addTask } from '@/services/taskServices'
import { toast } from 'react-toastify'

const metadata = {
    title: "Add Task: Work Manager"
}

const AddTask = () => {

    useEffect(() => {
        document.title = metadata.title
    }, [])


    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "none",
        //temporary
        userId: "661124f67961ea9c2083d587",
    });

    const handleAddTask = async (event) => {
        event.preventDefault();
        //validate task data

        try {
            const result = await addTask(task)
            console.log(result)
            toast.success("Your task is added", {
                position: "top-center",
            })
            setTask({
                title: "",
                content: "",
                status: "none",
            })
        } catch (error) {
            console.log(error)
            toast.error("Task not added", {
                position: "top-center"
            })
        }
    }

    const handleClear = () => {
        setTask({
            title: "",
            content: "",
            status: "none",
            //temporary
            userId: "661124f67961ea9c2083d587",
        })
    }

    return (
        <div className='grid grid-cols-12 justify-center'>
            <div className='col-span-6 col-start-4 shadow-sm'>
                <div className='flex justify-center'>
                    <Image src={formSVG} style={{ width: "40%" }} alt='add-task' />
                </div>
                <h1 className='text-3xl text-center'>Add your task here!!!</h1>
                <form action="#!" onSubmit={handleAddTask}>
                    <div className='mt-4'>
                        <label htmlFor='task_title' className='block text-sm font-medium mb-2'>Title</label>
                        <input type='text' className='w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800' id='task_title' name='task_title'
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    title: event.target.value,
                                })
                            }}
                            value={task.title}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='task_content' className='block text-sm font-medium mb-2'>Content</label>
                        <textarea className='w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800' id='task_content' rows={5} name="task_content"
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    content: event.target.value,
                                })
                            }}
                            value={task.content}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='task_status' className='block text-sm font-medium mb-2'>Status</label>
                        <select className='w-full p-3 rounded bg-gray-400 focus:ring-gray-300 border border-gray-800' id='task_status' name='task_status'
                            onChange={(event) => {
                                setTask({
                                    ...task,
                                    status: event.target.value,
                                })
                            }}
                            value={task.status}
                        >
                            <option value="none" disabled>---Select Status---</option>
                            <option value={'pending'}>Pending</option>
                            <option value={'completed'}>Completed</option>
                        </select>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'>Add Task</button>
                        <button type='button' className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3' onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask;