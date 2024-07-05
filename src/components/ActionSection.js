import React from 'react';
import '../App.css';

const ActionSection = () => {
  return (
    <div className="action-section">
      <h1>What would you like to do today?</h1>
      <div className="navigation-buttons">
        <button onClick={() => document.getElementById('contribute').scrollIntoView({ behavior: 'smooth' })}>
          Contribute to the Map
        </button>
        <button onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}>
          Explore the Map
        </button>
      </div>
    </div>
  );
};

export default ActionSection;