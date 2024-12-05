import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../../components/GameCard/GameCard';

const SearchResults = () => {
  const { games = [] } = useGameContext();
  const [filteredGames, setFilteredGames] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('search') || ''; 

  useEffect(() => {
    if (query) {
      const cleanQuery = query.trim().toLowerCase();

      const results = games.filter(game => {
        const gameName = game.name ? game.name.toLowerCase() : '';
        const gameTitle = game.title ? game.title.toLowerCase() : '';

        // Filtramos si el nombre o el título contienen el término de búsqueda
        return gameName.includes(cleanQuery) || gameTitle.includes(cleanQuery);
      });

      setFilteredGames(results);
    } else {
      setFilteredGames([]);
    }
  }, [games, query]);

  return (
    <div className="min-h-screen flex flex-col items-start p-4">
      <h1 className="text-2xl font-bold text-blue-700 text-center">
        {`Resultados de búsqueda para "${query}"`}
      </h1>
      
      <div className="flex flex-wrap justify-start gap-4 w-full mt-4">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div key={game._id} className="transition-opacity duration-500 opacity-100 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <GameCard game={game} />
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No se encontraron juegos para "{query}".
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
