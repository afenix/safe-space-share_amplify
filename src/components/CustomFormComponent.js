import React from 'react';
import '../App.css';

const CustomFormComponent =  ({ formData, setFormData, handleChange, handleSubmit }) => {
    console.log('CustomFormComponent rendered');

    return (
    <div className="survey-section">
        <form onSubmit={handleSubmit}>
            <label>
            Name of Location:
            <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} required />
            </label>
            <label>
            Date and Time of Experience:
            <input type="datetime-local" name="experienceDatetime" value={formData.experienceDatetime} onChange={handleChange} required />
            </label>
            <label>
            Happiness to Sadness (1-5):
            <input type="number" name="happinessSadness" value={formData.happinessSadness} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Calm to Anxious (1-5):
            <input type="number" name="calmAnxious" value={formData.calmAnxious} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Awake to Tired (1-5):
            <input type="number" name="awakeTired" value={formData.awakeTired} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Safety (1-5):
            <input type="number" name="safety" value={formData.safety} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Belonging (1-5):
            <input type="number" name="belonging" value={formData.belonging} onChange={handleChange} min="1" max="5" required />
            </label>
            <label>
            Identity Related? (yes/no/unsure):
            <select name="identityRelated" value={formData.identityRelated} onChange={handleChange} required>
                <option value="">Select an option</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
                <option value="2">Unsure</option>
            </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default CustomFormComponent;
