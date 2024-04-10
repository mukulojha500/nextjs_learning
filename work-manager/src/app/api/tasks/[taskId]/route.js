import { getResponseMessage } from "@/helper/errorMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

//get single task
export async function GET(request, {params}){

    const {taskId} = params;

    try{
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    }catch(error){
        console.log(error);
        return getResponseMessage("Error getting task", 404, false);
    }

}

//update task
export async function PUT(request,{params}){

    try{
        const {taskId} = params;

        const {title,content,status} = await request.json();

        let task=await Task.findById(taskId);
        task.title=title;
        task.content=content;
        task.status=status;

        const updatedTask = await task.save();

        return NextResponse.json(updatedTask);
    }catch(error){
        console.log(error);
        return getResponseMessage("Error in updating task", 500, false);
    }
}

//delete task
export async function DELETE(request, {params}){
    const {taskId} = params;
    try{
        await Task.deleteOne({
            _id: taskId,
        })
        return getResponseMessage("Task deleted successfully", 200, true);
    }catch(error){
        console.log(error);
        return getResponseMessage("Error deleting task", 500, false);
    }
}