import React from 'react'
import '../App.css'

const AboutSection = () => {
  return (
    <div className='about-section'>
      <h1 id='about-header'>What is SafeSpaceShare?</h1>
      <p>
        We all experience public spaces differently. These experiences, shaped
        by who we are and how we are perceived, profoundly impact our sense of
        safety, well-being, and belonging, but are rarely seen, yet alone seen
        collectively.
      </p>
      <p>
        SafeSpaceShare (S3) is designed to allow you to anonymously share your
        experiences, explore how your identity may have shaped them, and
        discover how others experience the same places.
      </p>
      <h2 id='about-subtitle'>Ready to dive in? <br/>Let's get started!</h2>
      <img
        id='everyone-matters-icon'
        src={`${process.env.PUBLIC_URL}/everyoneMatters.png`}
        alt='icon'
        className='everyone-matters-icon'
      />
    </div>
  )
}

export default AboutSection
