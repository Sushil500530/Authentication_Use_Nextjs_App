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
        console.log("find user=====>", user);
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
        const savedUser = await newUser.save();
        const userId = savedUser._id;
        console.log('aikhane ache ta ki jeter jonno verification failed dicche----->', userId);

        // send verification from email 
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}