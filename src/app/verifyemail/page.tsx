"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
    // const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState("");
    const [error, setError] = useState(false);

    const VerifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error:any) {
            console.log('user is not verified', error.response.data);
            setError(true)
        }
    }

    useEffect(()=>{
       const urlToken =  window.location.search.split("=")[1];
       setToken(urlToken || "")

    //    const {query} = router;
    //    const urlTokenTwo = query.token;

    },[]);


   useEffect(()=>{
    if(token.length > 0){
        VerifyUserEmail()
    }
   },[token])

    return (
        <div className='flex items-center justify-center flex-col space-y-3'>
            <h1 className="text-2xl text-center my-5">Consider here and please verify your email</h1>
           <h1 className='text-lg bg-green-500 text-white px-2 py-1 inline-block rounded-md'>{token ? `${token}` : "No Token"}</h1>
            {
                verified && <div>
                    <h1 className='text-lg font-medium text-green-50'>Verified</h1>
                    <Link href="login">Login</Link>
                </div>
            }
            {
                error && <div>
                    <h1 className='text-lg font-medium text-red-50'>Error</h1>
                </div>
            }
        </div>
    );
};

export default VerifyEmailPage;


