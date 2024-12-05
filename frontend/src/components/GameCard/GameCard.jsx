import React from 'react';
import { Link } from 'react-router-dom';
import './Gamecard.module.css';

const GameCard = ({ game }) => {
  return (
    <div className="relative group w-[250px] h-[350px] rounded-lg overflow-hidden shadow-lg">
      {/* Link debe envolver todo */}
      <Link to={`/gameList/gameDetails/${game._id}`} className="w-full h-full block">
        {/* Contenedor de la imagen */}
        <div className="w-full h-full relative">
          {game.image && (
            <img
              className="w-full h-full object-cover" // Asegura que la imagen se ajuste y no se distorsione
              src={`http://localhost:5001/${game.image}`}
              alt={game.title}
            />
          )}
        </div>

        {/* Superposición de título */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-xl font-bold text-center px-2">
            {game.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
