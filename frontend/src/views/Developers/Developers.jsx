import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext';
import { Link } from 'react-router-dom';

const DeveloperList = () => {
  const { developers } = useDeveloperContext();
  const [developerList, setDeveloperList] = useState([]);

  useEffect(() => {
    setDeveloperList(developers);
  }, [developers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-pink-700 text-white py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-200">
        Lista de Desarrolladores
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {developerList.map((developer, index) => (
          <div
            key={index}
            className="bg-gradient-to-tl from-gray-800 to-gray-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-pink-200 text-center">{developer.name}</h3>
              <p className="text-sm text-gray-300 mb-1">
                <span className="font-semibold text-violet-300">Fundado:</span> {developer.founded}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-violet-300">País:</span> {developer.country}
              </p>
            </div>
            <div className="bg-gray-700 py-2 px-4 flex justify-center">
              <Link
                to={`/developers/developerDetails/${developer._id}`}
                className="bg-pink-500 text-white py-1 px-4 rounded-md text-sm font-medium hover:bg-pink-600 transition"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;
