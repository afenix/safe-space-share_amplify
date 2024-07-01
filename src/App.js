import React from 'react';
import MapComponent from './components/MapComponent';
import Survey123Form from './components/Survey123Form';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Safe Space</h1>
      </header>
      <Survey123Form surveyUrl={surveyUrl} />
      <MapComponent />
    </div>
  );
}


export default App;
