import React, { useState } from 'react';
import SliderSection from './SliderSection';

const EmotionsForm = ({ formData, onSliderChange }) => {
  const [emotions, setEmotions] = useState({
    anxiousCalm: 2,
    sadHappy: 2,
    exhaustedAwake: 2,
  });

  const handleSliderChange = (emotion) => (event) => {
    setEmotions({ ...emotions, [emotion]: event.target.value });
  };

  return (
    <div className="emotions-form">
      <h2>how do you feel?</h2>
      <p>
        Emotions can be complex, but we'd like to know how you're feeling right now.
        Please use the sliders below to rate your current emotional state:
      </p>
      <SliderSection
        labelLeft="anxious"
        labelRight="calm"
        value={formData.calmAnxious}
        onChange={(value) => onSliderChange('calmAnxious', value)}
        emojiLabels={['😟', '😕', '😐', '🙂', '😌']}
      />
      <SliderSection
        labelLeft="sad"
        labelRight="happy"
        value={formData.happinessSadness}
        onChange={(value) => onSliderChange('happinessSadness', value)}
        emojiLabels={['😢', '😞', '😐', '😊', '😁']}
      />
      <SliderSection
        labelLeft="exhausted"
        labelRight="awake"
        value={formData.awakeTired}
        onChange={(value) => onSliderChange('awakeTired', value)}
        emojiLabels={['😴', '😪', '😐', '🙂', '😃']}
      />
      <button className="next-button">NEXT</button>
    </div>
  );
};

export default EmotionsForm;