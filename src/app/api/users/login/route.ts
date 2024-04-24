import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        // const user = await User.findOne({ email });
        const user = await User.findOne({email})
        console.log("find login user is -------->", user);
        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }

        console.log("user exists", user);

        const validPassword = await bcryptjs.compare(password, user.passwprd)

        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}