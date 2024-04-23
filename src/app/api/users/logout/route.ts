import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}