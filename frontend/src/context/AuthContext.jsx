import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Obtener el token de localStorage
    if (token) {
      try {
        // Decodificar el token
        const decoded = jwt_decode(token);
        console.log('Decoded Token:', decoded); // Mostrar el token decodificado para verificar su contenido
        setUser(decoded); // Almacenar la información del usuario en el estado
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const hasRole = (role) => {
    console.log('Checking role:', user?.role); // Ver el rol que estamos comprobando
    return user && user.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
