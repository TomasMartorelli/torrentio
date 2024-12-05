import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import './Carrousell.module.css';

import { FreeMode } from 'swiper/modules';
import { useGameContext } from '../../context/GameContext';
import GameCard from '../GameCard/GameCard'; // Asegúrate de tener este componente

const Carrousell = ({ genre }) => {
  const { games } = useGameContext(); // Obtener juegos del contexto
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    // Filtrar juegos por género
    const gamesByGenre = games.filter((game) => game.genre.toLowerCase() === genre.toLowerCase());
    setFilteredGames(gamesByGenre);
  }, [genre, games]);

  return (
    <div className="carousel-container">
      {filteredGames.length > 0 ? (
        <Swiper
          slidesPerView={3} // 3 juegos por fila
          spaceBetween={-150} // Menos espacio entre juegos
          freeMode={true}
          loop={true} // Habilitar loop
          modules={[FreeMode]}
          className="mySwiper"
        >
          {filteredGames.map((game) => (
            <SwiperSlide key={game._id}>
              <div className="game-card"> {/* Aplica la clase game-card */}
                <GameCard game={game} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No games available in this genre.</p>
      )}
    </div>
  );
};

export default Carrousell;