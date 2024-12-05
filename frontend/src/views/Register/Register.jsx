import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, password } = formData;

    const validationErrors = [];
    if (!name) {
      validationErrors.push("El nombre no puede estar vacío.");
    } else if (!nameRegex.test(name)) {
      validationErrors.push("El nombre solo puede contener letras.");
    }
    if (!email) {
      validationErrors.push("El campo de correo no puede estar vacío.");
    } else if (!emailRegex.test(email)) {
      validationErrors.push("Por favor, introduce un correo válido.");
    }
    if (!password) {
      validationErrors.push("El campo de contraseña no puede estar vacío.");
    } else if (password.length < 4) {
      validationErrors.push("La contraseña debe tener al menos 4 caracteres.");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/users", formData);
      if (response.status === 201) {
        setSuccessMessage("¡Usuario registrado exitosamente!");
        setErrors([]);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      setSuccessMessage("");
      const serverError =
        error.response?.data.message || "Error a la hora de registrar el usuario.";
      setErrors([serverError]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white">
      {/* Introducción */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">¡Bienvenido a nuestra comunidad!</h1>
        <p className="mt-4 text-lg">
          Únete para disfrutar de beneficios exclusivos y estar al día con nuestras novedades.
        </p>
      </header>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Crea tu cuenta</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Nombre de Usuario
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Correo Electrónico
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
          </label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Crea una contraseña"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Mensajes de error */}
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm list-disc list-inside mt-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Mensajes de éxito */}
        {successMessage && (
          <p className="text-green-500 text-center text-sm mt-4">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-300 shadow-lg transition-all"
        >
          Registrarse
        </button>
      </form>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm">
        <p>¿Ya tienes una cuenta? <a href="#" className="underline hover:text-indigo-200">Inicia sesión aquí</a>.</p>
      </footer>
    </div>
  );
};

export default Register;
