import React, { useState } from 'react'
import EmotionsForm from './EmotionsForm';
import '../App.css'

const CustomFormComponent = ({
  formData,
  handleSliderChange,
  handleChange,
  handleSubmit
}) => {
  console.log('formData: ', formData)

  return (
    <div className='survey-section'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-labels'>Name of Location:</label>
          <input
            className='form-inputs'
            type='text'
            name='locationName'
            value={formData.locationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-labels'>Date and Time of Experience:</label>
          <input
            className='form-inputs'
            type='datetime-local'
            name='experience_date'
            value={formData.experience_date}
            onChange={handleChange}
            required
          />
        </div>
        <EmotionsForm formData={formData} onSliderChange={handleSliderChange} />
            </label>
            <label>
            Belonging (1-5):
            <input type="number" name="belonging" value={formData.belonging} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Identity Related? (yes/no/unsure):
            <select name="identityRelated" value={formData.identityRelated} onChange={handleChange} required>
                <option value="">Select an option</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
                <option value="2">Unsure</option>
            </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default CustomFormComponent
