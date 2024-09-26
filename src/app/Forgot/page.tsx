"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Forgot() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        // password: "",
        // username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/Forgot", user)
            console.log("Forgot success", response.data);
            // router.push("/login");

        } catch (error: any) {
            console.log("Reset failed", error.message)

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (

        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl mt-36 px-4 md:px-96">
                {/* <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2> */}

                {/* <form className="mx-auto max-w-lg rounded-lg border"> */}
                <div className="flex flex-col gap-4 p-4 md:p-8 border border-red-400">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">{loading ? "Processing" : "Enter E-mail"}</h2>
                 

                    <div>
                        <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                        <input name="email" id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-red-300 transition duration-100 focus:ring" />
                    </div>

                    
                    <button onClick={onSubmit} className="block rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-600 md:text-base">{buttonDisabled ? "No Submit" : "Submit"}</button>
                   
                </div>
                {/* </form> */}
            </div>
        </div>
    )
}