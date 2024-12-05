import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';

const GameDetails = () => {
  const { id } = useParams();
  const { games } = useGameContext();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    const selectedGame = games.find(game => game._id === id);
    if (selectedGame) {
      setGameDetails(selectedGame);
    }
  }, [id, games]);

  if (!gameDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-black">
        <p className="text-2xl text-white font-light">Juego no encontrado.</p>
      </div>
    );
  }

  return (
    <section className="game-details bg-gradient-to-br from-gray-800 to-black min-h-screen py-8">
      <div className="container mx-auto max-w-6xl rounded-lg shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="relative">
          {gameDetails.image && (
            <img
              src={`http://localhost:5001/${gameDetails.image}`}
              alt={gameDetails.title}
              className="w-full h-80 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {gameDetails.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 text-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Descripción del Juego
              </h2>
              <p className="text-gray-300 leading-relaxed">{gameDetails.description}</p>
            </div>

            {/* Video */}
            <div>
              <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Video del Juego
              </h2>
              <a
                href={gameDetails.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-red-600 hover:bg-red-700 text-center text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all"
              >
                Ver en YouTube
              </a>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Requerimientos del Sistema
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                <span className="font-semibold text-white">GPU:</span> {gameDetails.requirements.gpu}
              </li>
              <li>
                <span className="font-semibold text-white">RAM:</span> {gameDetails.requirements.ram}
              </li>
              <li>
                <span className="font-semibold text-white">CPU:</span> {gameDetails.requirements.cpu}
              </li>
            </ul>
          </div>

          {/* Download Button */}
          <div className="mt-12 text-center">
            <a
              href={gameDetails.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg transition-all"
            >
              Descargar Juego
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameDetails;
