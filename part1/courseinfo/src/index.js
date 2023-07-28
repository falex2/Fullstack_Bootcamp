import React from 'react';
import ReactDOM from 'react-dom';
import ApiDataComponent from './services/ApiDataComponent';
import ParentAsinSearch from './services/ParentAsinSearch';

const App = () => {
  return(
    <div className="App">
      <h1>Estadisticas por Fecha</h1>
      <ApiDataComponent />
      <h1>Buscar ParentAsin</h1>
      <ParentAsinSearch />
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById('root'));



