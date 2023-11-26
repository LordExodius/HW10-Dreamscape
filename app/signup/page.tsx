'use client';

import Link from "next/link";
import { FormEvent } from "react";

export default function Signup() {
    //POST request to /api/signup
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        console.log(`Form submitted\nEmail: ${email}\nPassword: ${password}`)
        
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json();
        console.log(data)
        data.ok ? window.location.href = "/" : alert(`There was an error signing up. Please try again later.`);
    }

    return (
        <div className="flex items-center justify-center px-6 py-8">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl font-bold">DreamScape</h1>

                    <form className="space-y-4 md:space-y-6" onSubmit={ onSubmit }>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                            <input required type="email" name="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                            <input required type="password" name="password" id="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Start Dreaming</button>
                    </form>
                </div>
            </div>
        </div>
    );
}