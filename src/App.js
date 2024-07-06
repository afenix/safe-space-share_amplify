// Code to render the main application
import React, { useEffect } from 'react';
import WelcomeSection from './components/WelcomeSection';
import AboutSection from './components/AboutSection';
import ActionSection from './components/ActionSection';
import ContributeSection from './components/ContributeSection';
import ExploreSection from './components/ExploreSection';
import './App.css';

function App() {
console.log('App component rendered');

  const handleSubmit = async (formData) => {
    const featureServiceUrl = 'https://services1.arcgis.com/IVzPgL57Mwzk8mu1/arcgis/rest/services/S3_Simple/FeatureServer/0/addFeatures';
    const token = 'AAPK83337061f79941cdbcba8ea16add7f1csWFIvmrzXU7TvesGSEbfGqhfxRivSP37KmfuCDfiec8kVrxhDCre40EzzsvFCLSB';

    const addFeature = async () => {
      const response = await fetch(featureServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          f: 'json',
          token: token,
          features: JSON.stringify([
            {
              attributes: formData,
            },
          ]),
        }),
      });

      const result = await response.json();
      console.log('Add Feature Result:', result);
    };

    try {
      await addFeature();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <WelcomeSection />
      <AboutSection />
      <ActionSection />
      <div id="contribute">
        <ContributeSection onSubmit={handleSubmit} />
      </div>
      <div id="explore">
        <ExploreSection />
      </div>
    </div>
  );
}

export default App;
