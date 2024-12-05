import React, { useState, useEffect } from 'react';

const AbmDevelopers = () => {
  const [name, setName] = useState('');
  const [founded, setFounded] = useState('');
  const [country, setCountry] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [editName, setEditName] = useState('');
  const [editFounded, setEditFounded] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/developers');
        if (!response.ok) {
          throw new Error('Error al traer los desarrolladores');
        }
        const data = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchDevelopers();
  }, []);

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'El nombre es obligatorio.';
    if (!data.country.trim()) errors.country = 'El país es obligatorio.';
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateForm({ name, country });

    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(' '));
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/developers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, founded, country }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el desarrollador');
      }

      const newDeveloper = await response.json();
      setDevelopers((prev) => [...prev, newDeveloper]);
      setName('');
      setFounded('');
      setCountry('');
      setSuccessMessage('Desarrollador registrado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeveloper) return;

    try {
      const response = await fetch(`http://localhost:5001/api/developers/${selectedDeveloper}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDevelopers(developers.filter(dev => dev.name !== selectedDeveloper));
        setSelectedDeveloper(null);
        setSuccessMessage('Desarrollador borrado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage('Error al borrar el desarrollador: ' + (errorData.message || response.statusText));
      }
    } catch (error) {
      console.error('Error al borrar el desarrollador:', error);
      setErrorMessage('Error al borrar el desarrollador: ' + error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const errors = validateForm({ name: editName, country: editCountry });

    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors).join(' '));
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/developers/${selectedDeveloper}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, founded: editFounded, country: editCountry }),
      });

      if (!response.ok) {
        throw new Error('Error al editar el desarrollador');
      }

      const updatedDeveloper = await response.json();
      setDevelopers(developers.map((dev) => (dev.name === selectedDeveloper ? updatedDeveloper : dev)));
      setEditName('');
      setEditFounded('');
      setEditCountry('');
      setSelectedDeveloper(null);
      setSuccessMessage('Desarrollador editado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <>
    <h1 className="text-3xl text-white font-bold text-center my-6">Gestionar Desarrolladoras</h1>

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Agregar Desarrollador</h2>
      <div className="form-container space-y-8">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa el nombre"
              required
              className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="founded" className="text-gray-700 font-medium">Fundado</label>
            <input
              type="date"
              id="founded"
              value={founded}
              onChange={(e) => setFounded(e.target.value)}
              className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="country" className="text-gray-700 font-medium">País</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Ingresa el país"
              required
              className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Agregar
          </button>
        </form>
      
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Gestionar Desarrolladores</h3>
          <select
            value={selectedDeveloper || ''}
            onChange={(e) => {
              const developer = developers.find((dev) => dev.name === e.target.value);
              setSelectedDeveloper(developer ? developer.name : null);
              setEditName(developer ? developer.name : '');
              setEditFounded(developer ? developer.founded.split('T')[0] : '');
              setEditCountry(developer ? developer.country : '');
            }}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Selecciona un desarrollador para gestionar</option>
            {developers.map((dev) => (
              <option key={dev.name} value={dev.name}>
                {dev.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            disabled={!selectedDeveloper}
            className="mt-4 w-full py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Borrar Desarrollador
          </button>
        </div>
          
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Editar Desarrollador</h3>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="editName" className="text-gray-700 font-medium">Nombre</label>
              <input
                type="text"
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Edita el nombre"
                className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="editFounded" className="text-gray-700 font-medium">Fundado</label>
              <input
                type="date"
                id="editFounded"
                value={editFounded}
                onChange={(e) => setEditFounded(e.target.value)}
                className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="editCountry" className="text-gray-700 font-medium">País</label>
              <input
                type="text"
                id="editCountry"
                value={editCountry}
                onChange={(e) => setEditCountry(e.target.value)}
                placeholder="Edita el país"
                className="mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              disabled={!selectedDeveloper}
              className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Actualizar Desarrollador
            </button>
          </form>
        </div>
          
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 font-medium rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 font-medium rounded-md">
            {errorMessage}
          </div>
        )}
      </div>
    </div>

    </>
  )
}

export default AbmDevelopers