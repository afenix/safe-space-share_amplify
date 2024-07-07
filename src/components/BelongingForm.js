import React from 'react';
import SliderSection from './SliderSection';

const BelongingForm = ({ formData, onSliderChange }) => {
  return (
    <div id="belonging-section">
      <h1 className="form-headers">Do you feel a sense of BELONGING?</h1>
      <p className="info-text">
        Please use the slider below to rate how much you feel like you BELONG right now:
      </p>
      <SliderSection
        labelLeft="NO!"
        labelRight="YES!"
        value={formData.belonging}
        onChange={(value) => onSliderChange('belonging', value)}
        emojiLabels={['👎', '', '', '', '👍']}
      />
        <div className="navigation-buttons">
        <button type="button" onClick={() => document.getElementById('identity-section').scrollIntoView({ behavior: 'smooth' })}>
        Next
        </button>
        </div>
    </div>

  );
};

export default BelongingForm;