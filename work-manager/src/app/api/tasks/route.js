import { getResponseMessage } from "@/helper/errorMessage";
import { Task } from "@/models/task";
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

//get all tasks
export async function GET(request) {

    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting Tasks", 404, false);

    }

}

//create task
export async function POST(request) {

    const { title, content, userId, status } = await request.json();

    //fetching logged in user id
    const authToken = request.cookies.get("authToken").value
    const data = jwt.verify(authToken, process.env.JWT_KEY);

    try {
        const task = new Task({
            title,
            content,
            userId:data._id,
            status,
        })
        const createdTask = await task.save();

        return NextResponse.json(createdTask, {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return getResponseMessage("Falied to create Task!", 500, false);
    }

}