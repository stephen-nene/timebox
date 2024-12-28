import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorised({darkMode}) {
    return (
        <div className={`flex flex-col text-gray-900 dark:text-gray-100 items-center justify-center h-screen`}>
            <h1 className="text-5xl font-bold mb-4">Unauthorised  Access</h1>
            <p className="text-xl text-gray-00 mb-8">Try SSH you checky lad.</p>
            <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Go to Home</Link>
        </div>
    );
}
