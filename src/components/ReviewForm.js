import React from 'react';

const ReviewForm = ({ formData, handleChange, handleSubmit }) => {
    console.log('formData: ', formData);

  return (
    <div id="review-section" className="review-form">
      <h2>Please Review</h2>
      <p>Review and edit if necessary.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location & Time:</label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="experience_date"
            value={formData.experience_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Emotion:</label>
          <input
            type="text"
            name="happinessSadness"
            value={formData.happinessSadness}
            onChange={handleChange}
          />
          <input
            type="text"
            name="calmAnxious"
            value={formData.calmAnxious}
            onChange={handleChange}
          />
          <input
            type="text"
            name="awakeTired"
            value={formData.awakeTired}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Safe:</label>
          <input
            type="text"
            name="safety"
            value={formData.safety}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Belong:</label>
          <input
            type="text"
            name="belonging"
            value={formData.belonging}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Identity Related?:</label>
          <input
            type="text"
            name="identityInterpretation"
            value={formData.identityInterpretation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Additional:</label>
          <textarea
            name="finalThoughts"
            value={formData.finalThoughts}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>
  );
};

export default ReviewForm;