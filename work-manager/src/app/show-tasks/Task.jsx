import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'

const Task = ({ task, deleteTaskParent }) => {

    const { user } = useContext(UserContext);
    
    function deleteTask(taskId){
        deleteTaskParent(taskId);
    }
    return (
        <div className={` shadow-lg mt-2 rounded-md ${task.status === 'completed' ? "bg-green-500" : "bg-gray-500"}`}>
            <div className='p-5'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold'>{task.title}</h1>
                    <span onClick={()=>{
                        deleteTask(task._id)
                    }} className='shadow-lg bg-gray-550 rounded-full p-2 cursor-pointer hover:bg-gray-600'>
                        <RxCross1/>
                    </span>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className="flex justify-between">
                    <p className='text-left'>Status: <span className='font-bold'>{task.status}</span></p>
                    <p className='text-right'>Author: <span className='font-bold'>{user?.name}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Task