import { getResponseMessage } from "@/helper/errorMessage";
import { Task } from "@/models/task"
import { NextResponse } from "next/server"

//get tasks of a particular user
export async function GET(request,{params}){
    const {userId} = params
    try{
        const tasks = await Task.find({
            userId:userId
        })

        return NextResponse.json(tasks);

    }catch(error){
        console.log(error);
        return getResponseMessage("Error finding tasks", 404, false);
    }
}