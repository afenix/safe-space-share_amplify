import React from 'react';
import SliderSection from './SliderSection';

const SafetyForm = ({ formData, onSliderChange }) => {
  return (
    <div id="safety-section">
      <h1 className="form-headers">Do you feel SAFE?</h1>
      <p className="warning">
        Warning: If you are in immediate danger, STOP NOW, <br/> seek safety and call 911.
      </p>
      <p className="info-text">
        Please use the slider below to rate how SAFE you feel right now:
      </p>
      <SliderSection
        labelLeft="NO!"
        labelRight="YES!"
        value={formData.safety}
        onChange={(value) => onSliderChange('safety', value)}
        emojiLabels={['👎', '', '', '', '👍']}
      />
        <div className="navigation-buttons">
        <button type="button" onClick={() => document.getElementById('belonging-section').scrollIntoView({ behavior: 'smooth' })}>
        Next
        </button>
        </div>
    </div>

  );
};

export default SafetyForm;