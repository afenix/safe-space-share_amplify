import React, { useState } from 'react'
import EmotionsForm from './EmotionsForm';
import SafetyForm from './SafetyForm';
import BelongingForm from './BelongingForm';
import IdentityForm from './IdentityForm';
import FinalThoughtsForm from './FinalThoughtsForm.js';
import ReviewForm from './ReviewForm.js';
import '../App.css'

const CustomFormComponent = ({
  formData,
  handleSliderChange,
  handleChange,
  handleSubmit
}) => {
  console.log('formData: ', formData)

  return (
    <div className='form-section'>
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
        <SafetyForm formData={formData} onSliderChange={handleSliderChange} />
        <BelongingForm formData={formData} onSliderChange={handleSliderChange} />
        <IdentityForm formData={formData} handleChange={handleChange}  />
        <FinalThoughtsForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        <ReviewForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CustomFormComponent
