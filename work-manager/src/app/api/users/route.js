import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

const { connectDb } = require("@/helper/db");

connectDb();

//get all users
export async function GET(request){
    let users=[]
    try{
        users = await User.find().select("-password");
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Failed to get users",
            success: false,
        });
    }
    return NextResponse.json(users);
}

//create user
export async function POST(request){
    //fetch user details from request
    const {name, email, password, about, profileURL} = await request.json();

    //create user object with user model
    const user = new User({
        name,
        email,
        password,
        about,
        profileURL
    });

    try{
        //save user in db
        user.password = bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT))
        const createdUser = await user.save();
        const response = NextResponse.json(user,{
            status:201,
        })
    
        return response;

    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Failed to create the user!",
            status:false,
        },{
            status:500
        });
    }

}