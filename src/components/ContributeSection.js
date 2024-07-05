import React, { useState } from 'react';
import MapComponent from './MapComponent';
import '../App.css';

const ContributeSection = ({ onSubmit }) => {
console.log('i am in the ContributeSection')
  const [formData, setFormData] = useState({
    locationName: '',
    experienceDatetime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="contribute-section">
      <h1>Location of Experience</h1>
      <p>Please add the location of your experience:</p>
      <MapComponent formData={formData} setFormData={setFormData} />
      <form onSubmit={handleSubmit}>
        <label>
          Name of Location:
          <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} required />
        </label>
        <label>
          Date and Time of Experience:
          <input type="datetime-local" name="experienceDatetime" value={formData.experienceDatetime} onChange={handleChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContributeSection;