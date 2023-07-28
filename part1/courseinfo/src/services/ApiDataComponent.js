import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiDataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para hacer la consulta a la API
    // Declarando una función asíncrona 
    const fetchData = async () => {                            
    // El código dentro del bloque try se ejecuta y, si se produce un error, la ejecución se mueve al bloque catch.                                                
      try { 
    //Solicitud GET a la URL utilizando axios. La palabra await significa que JavaScript pausará la ejecución de la función fetchData hasta que la promesa devuelta por axios.get se resuelva.                                                                                                   
        const response = await axios.get('https://run.mocky.io/v3/563c22aa-fa3a-4cdb-95d2-c5fe24f966d2');       
    // Actualiza el estado con los datos de la API
        setData(response.data.salesAndTrafficByDate);     
    //Se ejecuta si hay algun error                                                      
      } catch (error) {
        console.error('Error al obtener los datos:', error);                                                    
      }
    };
    // Llama a la función para iniciar la solicitud HTTP
    fetchData();                                                                                                
  }, []);

    // Se declara una función llamada 'sortByDate' que toma un parámetro 'data'.
  const sortByDate = (data) => {
    // Se crea una copia de 'data' para no cambiar el array original.
    const sortedData = [...data];
    // Se utiliza la función 'sort' para organizar los elementos del array 'sortedData'.
    // Para cada par de elementos (a y b), se convierte la propiedad 'date' a un objeto Date
    // y luego se resta 'a.date' de 'b.date'.
    // Si el resultado es negativo, 'a' va antes que 'b'.
    // Si el resultado es positivo, 'b' va antes que 'a'.
    // Si el resultado es 0, el orden de 'a' y 'b' no cambia.
    // Obtenemos un array ordenado por fecha de forma ascendente.
    return sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Filtra los datos para obtener las páginas vistas y unidades ordenadas por fecha
  // Por cada 'item' en 'data', se esta creando un nuevo objeto.
  const filteredData = data.map((item) => ({
    // Propiedad 'date' que es igual a 'item.date'.
    date: item.date,
    // Propiedad 'pageViews' que es igual a 'item.trafficByDate.pageViews'.
    pageViews: item.trafficByDate.pageViews,
    // Propiedad 'unitsOrdered' que es igual a 'item.salesByDate.unitsOrdered'.
    unitsOrdered: item.salesByDate.unitsOrdered,
  }));
    //'sortedData' será una versión ordenada de 'filteredData'.
  const sortedData = sortByDate(filteredData);

  return (
    <div>
      <table style={{ width: '60%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ border: '2px solid black', textAlign: 'center' }}>
            <th style={{ padding: '8px' }}>Fecha</th>
            <th style={{ padding: '8px' }}>Páginas Vistas</th>
            <th style={{ padding: '8px' }}>Unidades Ordenadas</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} style={{ border: '1px solid black', textAlign: 'center'}}>
              <td style={{ padding: '8px' }}>{item.date}</td>
              <td style={{ padding: '8px' }}>{item.pageViews}</td>
              <td style={{ padding: '8px' }}>{item.unitsOrdered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiDataComponent;

