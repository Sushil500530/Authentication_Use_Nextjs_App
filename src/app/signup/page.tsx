"use client"
import { useState } from "react";

export default function SignupPage (){
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })

    const [buttonDisable,setButtonDisable] = useState(false);
    const [loading,setLoading] = useState(false)





    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-5">Signup page</h1>
        </div>
    );
};
