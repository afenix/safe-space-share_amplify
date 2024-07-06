import React, { useState, useRef } from 'react';
import MapComponent from './MapComponent';
import CustomFormComponent from './CustomFormComponent';
import '../App.css';

const ContributeSection = ({ onSubmit }) => {
console.log('ContributeSection rendered'); // Add this line

  const [formData, setFormData] = useState({
    locationName: '',
    experience_date: '',
    happinessSadness: '',
    calmAnxious: '',
    awakeTired: '',
    safety: '',
    belonging: '',
    identityInterpretation: '',
    identityTypes: '',
    race: '',
    ethnicity: '',
    age: '',
    sex: '',
    sexuality: '',
    genderIdentity: '',
    politicalViews: '',
    religiousBeliefs: '',
    immigrationStatus: '',
    economicBracket: '',
    otherIdentity: '',
    finalThoughts: '',
  });

  const mapComponentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint();
    }
    onSubmit(formData); // Call the onSubmit prop function
  };

  return (
    <div className="contribute-section">
      <h1 className="form-headers">Location of Experience</h1>
      <p className="form-content">How to Add Your Location:</p>
      <ol className="list-container">
        <li className='info-text'><b>Explore the Map:</b> Pan and zoom to find your location.</li>
        <li className='info-text'><b>Use Map Tools </b>(optional):</li>
          <ul>
            <li className='info-text'><b>Locate:</b> Click the Locate button to find your current location.</li>
            <li className='info-text'><b>Search:</b> Search for an address or place.</li>
          </ul>
        <li className='info-text'><b>Click to Pinpoint:</b> When ready, single click on the map to place a marker at your chosen location.</li>
      </ol>
      <MapComponent ref={mapComponentRef} formData={formData} setFormData={setFormData} onMapReady={() => {}} />
      <CustomFormComponent formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default ContributeSection;