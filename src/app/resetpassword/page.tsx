"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function resetpasswordPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        newPassword: "",
        confirmPassword: "",
        token:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onReset = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", user)
            console.log("Reset success", response.data);

        } catch (error: any) {
            console.log("Reset failed", error.message)

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        [1];
        setUser({...user, token: urlToken || ""});
      
    }, []);

    useEffect(() => {
        if(user.token.length > 0){
            onReset();
        }
      
    }, [user.token])

    useEffect(() => {
        if (user.newPassword.length > 0 && user.confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user.newPassword, user.confirmPassword]);

    return (
       
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl mt-36 px-4 md:px-96">
                {/* <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2> */}

                {/* <form className="mx-auto max-w-lg rounded-lg border"> */}
                <div className="flex flex-col gap-4 p-4 md:p-8 border border-red-400">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">{loading ? "Processing" : "Reset Password"}</h2>
                    
                    <div>
                        <label htmlFor="newpassword" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">New Password</label>
                        <input id="newpassword" type="password" value={user.newPassword} onChange={(e) => setUser({ ...user, newPassword: e.target.value })} name="newpassword"  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-red-300 transition duration-100 focus:ring" />
                    </div>

                    <div>
                        <label htmlFor="confirmpassword" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Confirm Password</label>
                        <input id="confirmpassword" type="password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} name="confirmpassword"  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-red-300 transition duration-100 focus:ring" />
                    </div>

                    <button onClick={onReset} className="block rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-600 md:text-base">{buttonDisabled ? "No Reset" : "Reset"}</button>
                    
                </div>
                <div>
                <h2 className="p-2 bg-orange-500 text-black ">
                    {user.token ? `${user.token}` : "no token" }</h2>
                </div>
            </div>
        </div>
    )
}