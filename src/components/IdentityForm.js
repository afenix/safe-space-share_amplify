import React from 'react'

const IdentityForm = ({ formData, handleChange }) => {
  const handleButtonClick = (value, e) => {
      e.preventDefault(); // Prevent the form from submitting
      handleChange({ target: { name: 'identityInterpretation', value } });
      };

  return (
    <div id="identity-section" className='identity-form'>
      <h1 className='form-headers'>
        Is Your Experience Related to Your Perceived Identity?
      </h1>
      <p className='info-text'>
        Do you feel your experience is related in any way to your perceived
        identity?
      </p>
      <p className='hint'>
        <i>
          Hint: Consider aspects such as gender, religious or political views,
          race, ethnicity, etc.
        </i>
      </p>
      <div className='button-group'>
        <button
          className={`option-button ${
            formData.identityInterpretation === 1 ? 'selected' : ''
          }`}
          onClick={(e) => handleButtonClick(1, e)}
        >
          YES
        </button>
        <button
          className={`option-button ${
            formData.identityInterpretation === 0 ? 'selected' : ''
          }`}
          onClick={(e) => handleButtonClick(0, e)}
        >
          NO
        </button>
        <button
          className={`option-button ${
            formData.identityInterpretation === 2 ? 'selected' : ''
          }`}
          onClick={(e) => handleButtonClick(2, e)}
        >
          UNCERTAIN
        </button>
      </div>
      <div className="navigation-buttons">
      <button type="button" onClick={() => document.getElementById('final-section').scrollIntoView({ behavior: 'smooth' })}>
          Next
        </button>
      </div>
    </div>
  )
}

export default IdentityForm
