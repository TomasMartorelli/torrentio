import React, { useState, useEffect } from 'react';
import { useDeveloperContext } from '../../context/DeveloperContext';

const Admin = () => {
  const [games, setGames] = useState([]);
  const { developers } = useDeveloperContext();
  const [selectedGame, setSelectedGame] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    weight: '',
    image: null,
    developer: '',
    description: '',
    youtubeUrl: '',
    gallery: [],
    requirements: { gpu: '', ram: '', cpu: '' },
    downloadLink: '',
  });
  

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/games');
        const data = await response.json();
        setGames(data);

        console.log(data);
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
      }
    };

    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    if (field === 'gallery') {
      setFormData({ ...formData, gallery: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, [name]: value },
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genre: '',
      releaseYear: '',
      weight: '',
      image: null,
      developer: '',
      description: '',
      youtubeUrl: '',
      gallery: [],
      requirements: { gpu: '', ram: '', cpu: '' },
      downloadLink: '',
    });
    setSelectedGame(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = new FormData();
  
    // Recorremos formData para agregar sus valores al FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'requirements') {
        // Si 'requirements' es un objeto, lo recorremos para agregar sus propiedades
        Object.entries(value).forEach(([reqKey, reqValue]) => {
          formPayload.append(`requirements[${reqKey}]`, reqValue);
        });
      } else if (key === 'gallery' && value.length > 0) {
        // Si 'gallery' tiene archivos, los agregamos a formPayload
        value.forEach((file, index) => {
          formPayload.append(`gallery[${index}]`, file);
        });
      } else if (key === 'image' && value) {
        // Si hay una imagen seleccionada, la agregamos
        formPayload.append(key, value);
      } else if (value && typeof value !== 'object') {
        // Si el valor no es un objeto, lo agregamos directamente
        formPayload.append(key, value);
      }
    });
  
    try {
      const response = await fetch(
        selectedGame
          ? `http://localhost:5001/api/games/${selectedGame._id}`
          : 'http://localhost:5001/api/games',
        {
          method: selectedGame ? 'PUT' : 'POST',  // Determinamos si es un 'PUT' (actualización) o 'POST' (creación)
          body: formPayload,
        }
      );
  
      if (!response.ok) throw new Error('Error en la solicitud');
  
      const data = await response.json();
  
      // Si estamos actualizando un juego, actualizamos la lista
      if (selectedGame) {
        setGames((prevGames) =>
          prevGames.map((game) => (game._id === data._id ? data : game))
        );
      } else {
        // Si estamos creando un juego, lo agregamos a la lista
        setGames((prevGames) => [...prevGames, data]);
      }
  
      resetForm(); // Reseteamos el formulario después de enviar los datos
    } catch (error) {
      console.error('Error al enviar los datos del juego:', error);
    }
  };
  

  const handleDelete = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/games/${gameId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.error('Error al eliminar el juego:', error);
    }
  };

  const handleEdit = (game) => {
    setSelectedGame(game);
    setFormData({
      title: game.title || '',
      genre: game.genre || '',
      releaseYear: game.releaseYear || '',
      weight: game.weight || '',
      image: null,
      developer: game.developer || '',
      description: game.description || '',
      youtubeUrl: game.youtubeUrl || '',
      gallery: [],
      requirements: {
        gpu: game.requirements?.gpu || '',
        ram: game.requirements?.ram || '',
        cpu: game.requirements?.cpu || '',
      },
      downloadLink: game.downloadLink || '',
    });
  };
  return (
    <div className="admin-container">
      <h1 className="text-3xl mb-4 text-center text-white font-bold mt-4">Gestión de Juegos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedGame ? 'Editar Juego' : 'Agregar Juego'}</h2>

        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Género */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Género
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccione un género</option>
            <option value="Acción">Acción</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Deportes">Deportes</option>
            <option value="FPS">FPS</option>
            <option value="Survival">Survival</option>
            <option value="Horror">Horror</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Souls">Souls</option>
            <option value="Roguelike">Roguelike</option>
          </select>
        </div>

        {/* Año de lanzamiento */}
        <div>
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
            Año de lanzamiento
          </label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (en GB)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Desarrollador */}
        <div>
          <label htmlFor="developer" className="block text-sm font-medium text-gray-700">
            Desarrollador
          </label>
          <select
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" selected>Seleccione un desarrollador</option>
            {
              developers.map((dev) => (
                <option key={dev._id} value={dev.name} selected>{dev.name}</option>
              ))
            }
          </select>
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, 'image')}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* URL de YouTube */}
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">
            URL de YouTube
          </label>
          <input
            type="text"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Requisitos */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">Requisitos</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label htmlFor="gpu" className="block text-sm font-medium text-gray-700">
                GPU
              </label>
              <input
                type="text"
                name="gpu"
                value={formData.requirements.gpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="ram" className="block text-sm font-medium text-gray-700">
                RAM
              </label>
              <input
                type="text"
                name="ram"
                value={formData.requirements.ram}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cpu" className="block text-sm font-medium text-gray-700">
                CPU
              </label>
              <input
                type="text"
                name="cpu"
                value={formData.requirements.cpu}
                onChange={handleRequirementChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Enlace de descarga */}
        <div>
          <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">
            Enlace de Descarga
          </label>
          <input
            type="url"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            {selectedGame ? 'Actualizar Juego' : 'Agregar Juego'}
          </button>
        </div>
      </form>
      {/* Listado de juegos */}
      <div className="mt-6 p-4">
        <h2 className="text-xl font-bold mb-4 text-white underline decoration-2">Juegos Agregados</h2>
        <div className="flex flex-col gap-3">
          {games.map((game) => (
            <div key={game._id} className="border border-gray-300 p-4 rounded-md shadow-sm bg-white rounded">
              <h3 className="text-lg font-semibold">{game.title}</h3>
              <p>{game.genre}</p>
              <div className="flex justify-center align-center mt-2 flex-col gap-2">
                <button
                  onClick={() => handleEdit(game)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded-md hover:bg-yellow-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(game._id)}
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;



