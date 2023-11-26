"use client";

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const {data: session} = useSession();
  console.log(`Session: ${session}`)
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<any[]>([]);
  const [toggleDropDown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const getProviders = async () => {
      const response = await fetch("/api/auth/providers");
      const result = await response.json();
      setProviders(result);
    };

    getProviders();
  }, []);

  return (
    <>
      {isUserLoggedIn ? (
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {/* Icon when menu is open. Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo and navigation links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Navigation links */}
                    <Link href="/">
                      <div
                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                        aria-current="page"
                      >
                        Home
                      </div>
                    </Link>
                    <Link href="/gallery">
                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Gallery
                      </div>
                    </Link>
                    <Link href="/social">
                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Social
                      </div>
                    </Link>
                    <Link href="/create-dreamboard">
                      <div className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Dream
                      </div>
                    </Link>
                    { session ? <></> :
                      <Link href="/login">
                        <div className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Login
                        </div>
                      </Link>
                    }
                    { session ? <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={() => signOut( { callbackUrl: 'http://localhost:3000'} )}>Logout</button> : <></>}
                  </div>
                </div>
              </div>

              {/* Notification icon and profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                {/* Profile dropdown */}
                <div className="dropdown">
                  {toggleDropDown && (
                    <>
                      <Link href="/">
                        <div
                          className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                          aria-current="page"
                        >
                          Profile
                        </div>
                      </Link>
                      <Link href="/">
                        <button
                          className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                          aria-current="page"
                          onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                          }}
                        >
                          Sign Out
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link href="/">
                <div
                  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Home
                </div>
              </Link>
              <Link href="/gallery">
                <div className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                  Gallery
                </div>
              </Link>
              <Link href="/social">
                <div className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                  Social
                </div>
              </Link>
              <Link href="/generate">
                <div className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                  Generate
                </div>
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className=""
              >
                Sign In
              </button>
            ))}
        </>
      )}{" "}
    </>
  );
};

export default Navbar;
