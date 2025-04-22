import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-9xl font-bold text-[#007A85] animate-bounce">404</h1>
            <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 border-3 border-[#007A85] text-[#007A85] text-lg font-bold rounded hover:bg-[#007A85] hover:text-white transition duration-300"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default PageNotFound;
