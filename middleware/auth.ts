import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getToken } from "next-auth/jwt";

interface CustomNextRequest extends NextRequest {
    user?: string; 
}
// export async function middleware(req: CustomNextRequest) {
  
//     const token=await getToken({req,secret:process.env.NEXTAUTH_SECRET})
//     if(token){
//         console.log("session",token)
//         req.user=token.sub
//         return NextResponse.next();
//     }
//     return NextResponse.error()
    
// }
  
// export const config = {
//     matcher: ['/api/listings/:path*']
// };