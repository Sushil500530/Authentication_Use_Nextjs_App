import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        // extract data from token 
      const userId =  await getDataFromToken(request);
        const user = User.findOne({_id:userId}).select("-Password")

        // check if there is no user 
        return NextResponse.json({message: "User found", data:user})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}