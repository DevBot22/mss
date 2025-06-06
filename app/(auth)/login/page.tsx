'use client'

import Link from "next/link"

export default function LoginPage () {
    return (
        <div className="mx-auto h-screen w-full flex bg-[#D9D9D9] ">
            <div className="mx-auto flex-col w-[400px] justify-center mt-12 shadow-lg bg-white rounded-lg h-[380px]">
                <h1 className="text-2xl mt-4 font-semibold text-center mb-5">Login</h1>

                    <form >
                      <div className="flex-col">
                          <h2 className="text ml-10">Email</h2>
                          <input type="email" className="ml-10 border rounded-md mt-3 w-[315px] p-2" 
                          placeholder="Enter your email"/>
                      </div>
                        <div className="flex-col mt-5">
                          <h2 className="text ml-10">Password</h2>
                          <input type="password" className="ml-10 border rounded-md mt-3 w-[315px] p-2" 
                          placeholder="Enter your password"/>
                      </div>
                        <button className="ml-10 border rounded-md mt-5 bg-[#D9D9D9] w-[315px] p-2  ">Login</button>
                      <div className="flex mt-5 gap-2 justify-center">
                        <h2>{`Don't have an account? `}</h2>
                        <Link href={'/signup'} className="text-sky-600">Sign up now</Link>
                      </div>
                    </form>
            </div>
        </div>
    )
}