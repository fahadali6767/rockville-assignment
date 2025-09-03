// src/app/(main)/layout.js
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Link href="/">
                <p className="block py-2 px-4 rounded hover:bg-gray-700">
                  Home
                </p>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/categories">
                <p className="block py-2 px-4 rounded hover:bg-gray-700">
                  Categories
                </p>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/profile">
                <p className="block py-2 px-4 rounded hover:bg-gray-700">
                  Profile
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold">
            Welcome to your Dashboard333
          </h1>
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                router.push("/login");
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
