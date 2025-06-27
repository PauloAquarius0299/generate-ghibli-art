import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Art <span className="text-blue-600">Generate</span> Ghibli
        </Link>
        <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/criar" className="hover:text-blue-600">Criar</Link></li>
          <li><Link to="/features" className="hover:text-blue-600">Features</Link></li>
          <li><Link to="/galeria" className="hover:text-blue-600">Galeria</Link></li>
          <li><Link to="/ghibli" className="hover:text-blue-600">Ghibli</Link></li>
        </ul>
        <Link to="/criar">
          <button className='bg-blue-600 py-2 px-8 rounded-lg text-white cursor-pointer hover:bg-blue-400'>
            Criar
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
