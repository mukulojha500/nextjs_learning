import { User } from '@/models/user';
import {NextResponse} from 'next/server';

//delete user
export async function DELETE(request, {params}){
    const {userId} = params;
    try{
        await User.deleteOne({
            _id:userId
        });

        return NextResponse.json({
            message:"User deleted!",
            success:true,
        });
    }catch(error){
        return NextResponse.json({
            message:"Error in deleting user!",
            success:false,
        });
    }
}

//get single user
export async function GET(request, {params}){
    const {userId} = params;
    
    try{
        const user = await User.findById(userId).select("-password");
        return NextResponse.json(user)
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Error finding user!",
            status:false,
        })
    }
}

//update user
export async function PUT(request,{params}){
    const {userId} = params
    const {name, password, about, profileURL} = await request.json();
    try{
        const user = await User.findById(userId);
        user.name=name;
        user.password=password;
        user.about=about;
        user.profileURL=profileURL;

        const updatedUser = await user.save()
        return NextResponse.json(updatedUser);
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Failed to update user!",
            success:false
        })
    }
}