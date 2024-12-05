import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../../components/GameCard/GameCard';

const GameCategories = () => {
  const { genre } = useParams();
  const { games } = useGameContext();
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filterGamesByGenre = () => {
      setIsLoading(true);
      if (genre) {
        const filtered = games.filter((game) => 
          game.genre.toLowerCase() === genre.toLowerCase()
        );
        setFilteredGames(filtered);
      } else {
        setFilteredGames(games);
      }
      setIsLoading(false);
    };

    filterGamesByGenre();
  }, [genre, games]);

  const genreTitle = genre 
    ? genre.charAt(0).toUpperCase() + genre.slice(1) 
    : 'Juegos';

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500 text-center w-full mt-8">
        {`Juegos de ${genreTitle}`}
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-8 px-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div key={game._id} className="transition-transform duration-300 transform hover:scale-105">
                <GameCard game={game} />
              </div>
            ))
          ) : (
            <p className="text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-4 col-span-full">
              No se encontraron juegos en este género.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GameCategories;
