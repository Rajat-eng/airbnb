import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request:Request){
    try {
        const body = await request.json();
        const { 
            email,
            name,
            password,
           } = body;
      
        const hashedPassword = await bcrypt.hash(password, 12);
        const user=await prisma.user.create({
            data:{
                email,name,hashedPassword
            }
        })
    
        let json_resp={
            success:true,
            data:{
                user
            }
        }
        return NextResponse.json(JSON.stringify(json_resp),{
            status:201
        }) 
    } catch (error:any) {
        console.log(error)
        if(error.code=='2002'){
            let error_response = {
                success: "false",
                message: "User already exists",
              };
              return new NextResponse(JSON.stringify(error_response), {
                status: 409,
              });
        }
        let error_res={
            success:'false',
            message:error.message
        }
        return NextResponse.json(JSON.stringify(error_res),{
            status:500
        })
    } 
}