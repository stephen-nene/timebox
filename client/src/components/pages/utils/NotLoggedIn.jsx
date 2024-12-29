import React from "react";
import { Link } from "react-router-dom";

export default function NotLoggedIn() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className={`text-5xl  text-gray-900 dark:text-gray-200 font-bold mb-4`}>Oops! Not Logged In</h1>
            <p className="text-xl text-gray-600 mb-8">To access this page you have to be logged in.</p>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Go to Login</Link>
        </div>
    );
}
