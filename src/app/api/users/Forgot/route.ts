import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email , token } = reqBody
    

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not exist"},{status:400})
        }

   

            //send email on the enteres email-id
            await sendEmail({email, emailType: "RESET",
            userId: user._id})

            return NextResponse.json({
                message: "User created successfully",
                success: true,
             
            })
        


        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status:500})
        
    }
}


connect() 