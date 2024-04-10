import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {

    const authToken = request.cookies.get('authToken')?.value;

    if(request.nextUrl.pathname==='/api/login' || request.nextUrl.pathname==='/api/users') return;

    const loggedInUserNotAccessPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
    if (loggedInUserNotAccessPath) {
        if (authToken) {
            return NextResponse.redirect(new URL('/profile/user', request.url))
        }
    }else{
        if(!authToken){
            if(request.nextUrl.pathname.startsWith('/api')){
                return NextResponse.json({
                    message:"Access Denied",
                    success:false,
                },{
                    status:401,
                })
            }
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // return NextResponse.redirect(new URL('/home',request.url))
}

export const config = {
    matcher: ['/', '/login', '/signup', '/add-task', '/show-tasks', '/profile/:path', '/api/:path*'],
}