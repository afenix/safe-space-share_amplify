// Code to render the main application
import React, { useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Survey123Form from './components/Survey123Form';
import logo from './logo.svg';
import './App.css';

function App() {
  const surveyUrl = "https://arcg.is/1PTu1L";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
