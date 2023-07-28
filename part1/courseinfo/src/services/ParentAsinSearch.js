import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParentAsinSearch = () => {
  // Se definen los estados locales
  const [parentAsin, setParentAsin] = useState(''); // Estado para almacenar el ParentAsin ingresado en el input
  const [searchedParentAsin, setSearchedParentAsin] = useState(null); // Estado para almacenar el ParentAsin encontrado en la búsqueda
  const [data, setData] = useState([]); // Estado para almacenar el listado completo de ParentAsin obtenido de la API

  useEffect(() => {
    // useEffect para obtener los datos de la API al cargar el componente
    const fetchData = async () => {
      try {
        // Solicitud GET a la API utilizando Axios
        const response = await axios.get('https://run.mocky.io/v3/563c22aa-fa3a-4cdb-95d2-c5fe24f966d2');
        setData(response.data.salesAndTrafficByAsin); // Se actualiza el estado 'data' con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData(); // Llamada a la función para obtener los datos
  }, []);

  const handleSearch = () => {
    // Función para manejar la búsqueda 
    const result = data.find((item) => item.parentAsin === parentAsin); // Se busca el ParentAsin ingresado en la lista completa de ParentAsin
    setSearchedParentAsin(result); // Se actualiza el estado 'searchedParentAsin' con el resultado encontrado
  };

  const handleRefresh = () => {
    // Función para manejar el botón de refresh
    setSearchedParentAsin(null); // Se reinicia el estado 'searchedParentAsin' a null para borrar la ultima busqueda
    setParentAsin(''); // Se reinicia a campo vacio 
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={parentAsin}
          onChange={(e) => setParentAsin(e.target.value)}
          placeholder="Buscar ParentAsin"
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleRefresh}>Refrescar</button>
      </div>

      {searchedParentAsin ? ( // Mostra el resultado de busqueda
        <div>
          <h3>ParentAsin encontrado:</h3>
          <p>{searchedParentAsin.parentAsin}</p>
        </div>
      ) : ( // Si no hay resultado queda la lista completa
        <div>
          <h3>Listado de ParentAsin:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.parentAsin}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParentAsinSearch;
