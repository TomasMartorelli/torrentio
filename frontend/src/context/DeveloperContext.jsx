import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DeveloperContext = createContext();

export const DeveloperProvider = ({ children }) => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/developers');
        setDevelopers(response.data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);

  // Método para agregar una desarrolladora
  const addDeveloper = async (developer) => {
    try {
      const response = await axios.post('http://localhost:5001/api/developers', developer);
      setDevelopers((prevDevelopers) => [...prevDevelopers, response.data]);
    } catch (error) {
      console.error('Error adding developer:', error);
    }
  };

  return (
    <DeveloperContext.Provider value={{ developers, addDeveloper }}>
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDeveloperContext = () => {
  return useContext(DeveloperContext);
};
