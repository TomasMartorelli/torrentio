import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage('Por favor, complete todos los campos.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', formData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setSuccessMessage('Inicio de sesión exitoso!');
        navigate('/'); // Redirigir al dashboard o ruta protegida
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">¡Bienvenido de nuevo!</h1>
        <p className="text-center text-sm mb-6 text-gray-600">
          Por favor, ingresa tus credenciales para acceder a tu cuenta. Si no tienes una, 
          <a href="/register" className="text-blue-600 hover:text-blue-800 underline">
            regístrate aquí
          </a>.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email-login"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email-login"
              name="email"
              placeholder="Ejemplo: usuario@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password-login"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password-login"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            />
          </div>

          <div className="text-right mb-4">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center text-sm mb-4">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Regístrate aquí
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
