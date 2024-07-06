import React from 'react';

const SliderSection = ({ labelLeft, labelRight, value, onChange, emojiLabels }) => {
  return (
    <div className="slider-section">
      <div className="slider-labels">
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
      <input
        type="range"
        min="0"
        max="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="slider"
      />
      <div className="emoji-labels">
        {emojiLabels.map((emoji, index) => (
          <span key={index} className="emoji">
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SliderSection;