import React, { useState, useRef, useEffect } from 'react'
import MapComponent from './MapComponent'
import CustomFormComponent from './CustomFormComponent'
import '../App.css'

const ContributeSection = ({ onSubmit }) => {
  // Utily function for converting a local date string to a unix timestamp
  const convertToUnixTimestamp = dateString => {
    const date = new Date(dateString)
    return date.getTime()
  }

  const [formData, setFormData] = useState({
    locationName: '',
    experience_date: '',
    happinessSadness: '',
    calmAnxious: '',
    awakeTired: '',
    safety: '',
    belonging: '',
    identityInterpretation: '',
    // identityTypes: '',
    // race: '',
    // ethnicity: '',
    // age: '',
    // sex: '',
    // sexuality: '',
    // genderIdentity: '',
    // politicalViews: '',
    // religiousBeliefs: '',
    // immigrationStatus: '',
    // economicBracket: '',
    // otherIdentity: '',
    finalThoughts: '',
    geometry: {
      longitude: null,
      latitude: null
    }
  })

  const mapComponentRef = useRef(null)

  // This useEffect hook is used to update the formData state with the selected point's longitude and latitude when the mapComponentRef is available.
  useEffect(() => {
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint = () => {
        if (mapComponentRef.current.selectedPoint) {
          console.log('Selected Point:', mapComponentRef.current.selectedPoint)

          const { longitude, latitude, experience_date } =
            mapComponentRef.current.selectedPoint
          setFormData(prevData => ({
            ...prevData,
            experience_date,
            geometry: {
              longitude,
              latitude
            }
          }))
        }
      }
    }
  }, [mapComponentRef])

  // Handles form input changes and updates the formData state.
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  // Handles slider input changes and updates the formData state.
  const handleSliderChange = (emotion, value) => {
    setFormData(prevData => ({
      ...prevData,
      [emotion]: value
    }))
  }

  // Handles form submission and calls the onSubmit prop function.
  const handleSubmit = async e => {
    e.preventDefault()
    if (mapComponentRef.current) {
      mapComponentRef.current.updateFormDataWithPoint()
    }
    const formDataWithTimestamp = {
      ...formData,
      experience_date: convertToUnixTimestamp(formData.experience_date) // Convert to Unix timestamp
    }
    onSubmit(formDataWithTimestamp)
  }

  return (
    <div className='contribute-section'>
      <h1 className='form-headers'>Location of Experience</h1>
      <p className='form-content'>How to Add Your Location:</p>
      <ol className='list-container'>
        <li className='info-text'>
          <b>Explore the Map:</b> Pan and zoom to find your location.
        </li>
        <li className='info-text'>
          <b>Use Map Tools </b>(optional):
        </li>
        <ul>
          <li className='info-text'>
            <b>Locate:</b> Click the Locate button to find your current
            location.
          </li>
          <li className='info-text'>
            <b>Search:</b> Search for an address or place.
          </li>
        </ul>
        <li className='info-text'>
          <b>Click to Pinpoint:</b> When ready, single click on the map to place
          a marker at your chosen location.
        </li>
      </ol>
      <MapComponent
        ref={mapComponentRef}
        formData={formData}
        setFormData={setFormData}
        onMapReady={() => {}}
      />
      <CustomFormComponent
        formData={formData}
        setFormData={setFormData}
        handleSliderChange={handleSliderChange}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ContributeSection
