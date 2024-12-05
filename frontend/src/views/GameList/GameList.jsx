import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../context/GameContext'; // Accedemos al contexto
import GameCard from '../../components/GameCard/GameCard'; // Importamos el componente GameCard
import './GameList.css';

// Botón reutilizable para la paginación
const PaginationButton = ({ onClick, disabled, children, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
      active
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
    } disabled:bg-gray-200`}
  >
    {children}
  </button>
);

const GameList = () => {
  const { games } = useGameContext(); // Extraemos los juegos desde el contexto
  const [newGames, setNewGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const gamesPerPage = 12; // Número de juegos por página

  // Sincronizamos los juegos desde el contexto con el estado local
  useEffect(() => {
    setNewGames(games);
  }, [games]);

  // Cálculo de juegos a mostrar en la página actual
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = newGames.slice(indexOfFirstGame, indexOfLastGame);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(newGames.length / gamesPerPage);

  // Generar las páginas visibles para mostrar
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Máximo de botones visibles

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300 flex flex-col items-center p-6">
      {/* Título */}
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-wide">
        Lista de Juegos
      </h1>

      {/* Contenedor de los juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full p-6 bg-white shadow-xl rounded-xl">
        {currentGames.map((game) => (
          <div
            key={game._id}
            className="transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg bg-gray-50 p-4"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination-container flex items-center justify-center mt-8 space-x-4">
        {/* Botón anterior */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592;
        </PaginationButton>

        {/* Números de página */}
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            active={currentPage === pageNumber}
          >
            {pageNumber}
          </PaginationButton>
        ))}

        {/* Puntos suspensivos */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            <span className="pagination-dots text-lg text-gray-600">...</span>
            <PaginationButton onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationButton>
          </>
        )}

        {/* Botón siguiente */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </PaginationButton>
      </div>
    </div>
  );
};

export default GameList;

