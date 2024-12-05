import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDeveloperContext } from '../../context/DeveloperContext';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../../components/GameCard/GameCard';

const DeveloperDetails = () => {
  const { id } = useParams();
  const { games } = useGameContext();
  const { developers } = useDeveloperContext();

  const developer = useMemo(() => {
    return developers.find((dev) => dev._id === id);
  }, [developers, id]);

  const developerGames = useMemo(() => {
    return games.filter((game) => game.developer === developer?.name);
  }, [games, developer]);

  if (!developer) {
    return <p className="text-center text-white">Developer no encontrado.</p>;
  }

  return (
    <section className="game-details">
      <div className="container p-4">
        <div className="game-details__title-img">
          <h1 className="game-details__title text-3xl font-semibold mb-4 text-center text-white">
            {developer.name}
          </h1>

          <div className="flex flex-col jusitfy-center items-center dev-details w-auto gap-1">
            <div className="content flex flex-col jusitfy-center items-center bg-blue-900 p-2 rounded">
              <p className="ubicacion text-white"><span className='underline decoration-1'>Ubicación</span>: {developer.country}</p>
              <p className="fundacion text-white"><span className='underline decoration-1'>Fundada en</span>: {developer.founded}</p>
            </div>
          </div>
        </div>

        <div className="games">
          <h2 className="text-2xl font-semibold mb-4 text-white">Juegos desarrollados:</h2>
          
          <div className="grid grid-cols-4  justify-center flex-row">
            {
              developerGames.map((game) => (
                <div key={game._id} className="transition-opacity duration-500 opacity-100">
                  <GameCard game={game} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperDetails;
