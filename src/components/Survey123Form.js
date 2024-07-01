import React, { useState, useEffect } from 'react';

function Survey123Form({ surveyUrl }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add event listener to detect when iframe has loaded
    const iframe = document.getElementById('surveyFrame');
    iframe.onload = () => setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading && <p>Loading Survey123...</p>}
      <iframe
        id="surveyFrame"
        title="Survey123 Form"
        src={surveyUrl}
        width="100%"
        height="1000px" // Adjust height as needed
        frameBorder="0"
        allowFullScreen
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default Survey123Form;