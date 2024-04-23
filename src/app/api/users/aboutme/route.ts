import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest) {
    try {
        // extract data from token 
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}