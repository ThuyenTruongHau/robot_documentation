import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Welcome to <span className="text-primary-600">Thado Robot</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          A modern fullstack application built with ReactJS and Django. 
          Experience the power of TypeScript, Tailwind CSS, and Django REST Framework.
        </p>
        
        <div className="flex justify-center space-x-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Frontend</h3>
            <p className="text-gray-600">ReactJS with TypeScript</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Backend</h3>
            <p className="text-gray-600">Django REST Framework</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Styling</h3>
            <p className="text-gray-600">Tailwind CSS</p>
          </div>
        </div>
        
        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-medium text-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
