'use client';

import Link from "next/link";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const status = await signIn("credentials", {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            redirect: false
        });
        console.log(status);
        status?.ok ? window.location.href = "/" : alert("Invalid credentials.");
    }
    return (
        <main>
            <div className="flex items-center justify-center px-6 py-8">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-bold">Login</h1>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" required id="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" required id="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Sign in with Email</button>
                            <p>Haven&apos;t started dreaming yet? <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/signup">Sign up here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}