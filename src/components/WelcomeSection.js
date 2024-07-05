import React from 'react';
import '../App.css';

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <header className="App-header">
        <h1 className='s3-header'>WELCOME</h1>
        {/* <img src={`${process.env.PUBLIC_URL}/SafeSpaceShare_3C.png`} alt="icon" className="s3-icon1" /> */}
        <img src={`${process.env.PUBLIC_URL}/s3_icon_Green.png`} alt="icon" className="s3-icon3" />
        <h3>SafeSpaceShare</h3>
        <h5>you belong here...</h5>
      </header>
    </div>
  );
};

export default WelcomeSection;