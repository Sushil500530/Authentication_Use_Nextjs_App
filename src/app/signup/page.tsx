"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Sign -up Success", response.data);
            toast.success('signup successfully')
            router.push('/login')


        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [user])



    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-5">Signup page</h1>
            <button onClick={handleSignup}>Click here</button>
        </div>
    );
};
