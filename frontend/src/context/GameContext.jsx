import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar juegos
        const gamesResponse = await axios.get('http://localhost:5001/api/games'); // Reemplaza con tu endpoint real
        setGames(gamesResponse.data);

        // Cargar categorías
        const categoriesResponse = await axios.get('http://localhost:5001/api/categories'); // Reemplaza con tu endpoint real
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching games or categories:', error);
      }
    };

    fetchData();
  }, []);

  const addGame = async (game) => {
    try {
      const response = await axios.post('http://localhost:5001/api/games', game); 
      setGames((prevGames) => [...prevGames, response.data]); 
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  // Función para obtener el nombre de la categoría por ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <GameContext.Provider value={{ games, categories, addGame, getCategoryName }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook para acceder al contexto
export const useGameContext = () => {
  return useContext(GameContext);
};
