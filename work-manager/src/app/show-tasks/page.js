"use client"

import UserContext from '@/context/userContext'
import { deleteTask, getTaskOfUser } from '@/services/taskServices'
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import { toast } from 'react-toastify'

const metadata = {
  title: "All Tasks: Work Manager"
}

const ShowTasks = () => {

  useEffect(() => {
    document.title = metadata.title;
  }, [])

  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);

  async function loadTasks(userId) {
    try {
      const tasks = await getTaskOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (context.user) loadTasks(context.user._id);
  }, [context.user]);

  async function deleteTaskParent(tasksId){
    try{
      const result = await deleteTask(tasksId)
      console.log(result)
      const newTasks = tasks.filter(item=>item._id!==tasksId)
      setTasks(newTasks)
      toast.success("Deleted task",{
        position:"top-center"
      })
    }catch(error){
      console.log(error);
      toast.error("Error deleting task",{
        position:"top-center"
      })
    }
  }

  return (
    <div className='grid grid-cols-12 mt-3'>
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl text-center mb-3'>Your tasks ({tasks.length})</h1>
        {tasks.map((task) => (
          <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
        ))}
      </div>
    </div>
  )
}

export default ShowTasks
