// Code to render the main application
import React, { useEffect } from 'react';
import WelcomeSection from './components/WelcomeSection';
import AboutSection from './components/AboutSection';
import ActionSection from './components/ActionSection';
import ContributeSection from './components/ContributeSection';
import ExploreSection from './components/ExploreSection';
import './App.css';

function App() {
  const handleSubmit = async (formData) => {
    const featureServiceUrl = 'https://services1.arcgis.com/IVzPgL57Mwzk8mu1/arcgis/rest/services/S3_Simple/FeatureServer/0/addFeatures';
    const token = 'AAPK83337061f79941cdbcba8ea16add7f1csWFIvmrzXU7TvesGSEbfGqhfxRivSP37KmfuCDfiec8kVrxhDCre40EzzsvFCLSB';

    const addFeature = async () => {
      const feature = {
        attributes: {
          locationName: formData.locationName,
          experience_date: formData.experience_date,
          happinessSadness: formData.happinessSadness,
          calmAnxious: formData.calmAnxious,
          awakeTired: formData.awakeTired,
          safety: formData.safety,
          belonging: formData.belonging,
          identityInterpretation: formData.identityInterpretation,
          identityTypes: formData.identityTypes,
          // race: formData.race,
          // ethnicity: formData.ethnicity,
          // age: formData.age,
          // sex: formData.sex,
          // sexuality: formData.sexuality,
          // genderIdentity: formData.genderIdentity,
          // politicalViews: formData.politicalViews,
          // religiousBeliefs: formData.religiousBeliefs,
          // immigrationStatus: formData.immigrationStatus,
          // economicBracket: formData.economicBracket,
          // otherIdentity: formData.otherIdentity,
          finalThoughts: formData.finalThoughts,
        },
        geometry: {
          x: formData.geometry.longitude,
          y: formData.geometry.latitude,
          spatialReference: { wkid: 4326 } // WGS 84
        }
      };

      const response = await fetch(featureServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          f: 'json',
          token: token,
          features: JSON.stringify([feature]),
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
