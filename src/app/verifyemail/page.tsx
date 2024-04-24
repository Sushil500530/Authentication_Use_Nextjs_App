"use client"
import axios from 'axios';
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
       const userToken =  window.location.search.split("-")[1];
       setToken(userToken || "")

    //    const {query} = router;
    //    const urlToken = query.token;

    },[]);


    useEffect(()=>{
     if(token.length > 0){
        verifyUserEmail()
     }
    },[token])

    return (
        <div className='flex items-center justify-center flex-col'>
            <h1 className="text-2xl text-center my-5">Consider here and please verify your email</h1>
           <h1 className='text-lg bg-green-500 text-white px-2 py-1 inline-block rounded-md'>{token ? `${token}` : "No Token"}</h1>
        </div>
    );
};

export default VerifyEmailPage;


