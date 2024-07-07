import React from 'react';

const FinalThoughtsForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div id="final-section" className="final-thoughts-form">
      <h1 className='form-headers'>Is There Anything Else You'd Like to Share About Your Experience?</h1>
      <p className="info-text">
        Please use the space below to share any additional thoughts or details about your experience. Your input is valuable and helps us understand your experience better.
      </p>
      <p className="hint">
        Hint: Feel free to describe any specific events, feelings, or thoughts that you deem significant for others to know.
      </p>
      <textarea
        name="finalThoughts"
        value={formData.finalThoughts}
        onChange={handleChange}
        placeholder="Share your thoughts here..."
      />
      <div className="navigation-buttons">
        <button type="button" onClick={() => document.getElementById('review-section').scrollIntoView({ behavior: 'smooth' })}>
        Next
        </button>
        </div>
    </div>
  );
};

export default FinalThoughtsForm;