import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // here validation
        console.log(reqBody);
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        //  save database from here 
        const saveUser = await newUser.save();
        console.log(saveUser);

        // sent verification from email 
        await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id })

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            saveUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}