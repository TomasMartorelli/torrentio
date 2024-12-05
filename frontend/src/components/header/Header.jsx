import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-violet-700 to-violet-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          <span className="text-white">TORRENTIO</span>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navegación */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex items-center space-x-6 md:space-x-8 bg-violet-800 md:bg-transparent rounded-lg md:rounded-none p-4 md:p-0 absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto`}
        >
          {/* Links */}
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
            <li>
              <NavLink
                to="/"
                className="hover:text-yellow-400 transition duration-200"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gameList"
                className="hover:text-yellow-400 transition duration-200"
              >
                Juegos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/developers"
                className="hover:text-yellow-400 transition duration-200"
              >
                Desarrolladores
              </NavLink>
            </li>

            {/* Dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-yellow-400 flex items-center transition duration-200"
              >
                Categorías
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 w-56 bg-pink-800 text-white rounded-lg shadow-lg z-10">
                  {[
                    'Acción',
                    'Aventura',
                    'RPG',
                    'Deportes',
                    'Horror',
                    'FPS',
                    'Roguelike',
                    'Souls',
                    'Sandbox',
                    'Survival',
                  ].map((category) => (
                    <li
                      key={category}
                      className="hover:bg-violet-600 rounded-md transition duration-200"
                    >
                      <NavLink
                        to={`/category/${category}`}
                        className="block px-4 py-2"
                      >
                        {category}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          {/* Buscador */}
          <form
            onSubmit={handleSearch}
            className="mt-4 md:mt-0 flex items-center bg-white rounded-full shadow-md overflow-hidden"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar juegos..."
              className="px-4 py-2 w-full md:w-64 text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-700 px-4 py-2 transition duration-200 text-white font-bold"
            >
              Buscar
            </button>
          </form>

          {/* Botones de autenticación */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg shadow-md text-white transition duration-200"
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-violet-600 hover:bg-violet-400 px-4 py-2 rounded-lg shadow-md text-white transition duration-200"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-500 hover:bg-pink-700 px-4 py-2 rounded-lg shadow-md text-white transition duration-200"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
