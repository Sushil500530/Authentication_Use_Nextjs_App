"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(user);
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
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-center my-5">Please Signup Here</h1>
            <h1 className="text-xl font-normal my-5">{loading ? <div> Processing<span className="animate-ping text-xl font-bold">.....</span></div> : "Signup"}</h1>
            <br />
            <p className="text-start mb-5 text-green-600 font-medium">Please fill the form</p>
            <div>
                <label htmlFor="username">Username*</label> <br />
                <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="mt-3 border border-gray-400 p-2 mb-5 rounded" placeholder="enter your name..." />
            </div>
            <div>
                <label htmlFor="email">email*</label> <br />
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="mt-3 border border-gray-400 p-2 mb-5 rounded" placeholder="enter your email..." />
            </div>
            <div>
                <label htmlFor="password">password*</label> <br />
                <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="mt-3 border border-gray-400 p-2 mb-5 rounded" placeholder="enter your password..." />
            </div>
            <div>
                <button onClick={handleSignup} className={`px-24 py-2 ${buttonDisable ? 'bg-red-600' : 'bg-green-600'} bg-green-600 text-white rounded`}>{buttonDisable ? "No Signup" : "Signup"}</button>
            </div>
            <p className="mt-3">already have an account please <Link href="/login" className="text-blue-600 font-medium underline">Login</Link> </p>
        </div>
    );
};
