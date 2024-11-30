import React from 'react'
import '../styles/newdoctor.css';
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/photo.png'
const NewDoctor = () => {
  const navigate = useNavigate();
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file.name);
        // Handle file upload logic here
      }
    };

  return (
    <>
    <div className="patient-header">
                <h1>Doctors</h1>
                <button onClick={()=> navigate('/tables')}>Back to Tables</button>
        </div>
      <div className="doctor-form-container-main">
        <form action="">
        <h1>Doctor  Reggistration</h1>
          <h2>Personal Information</h2>
          <div className="top-doctorinput-container">
          <div className="image-upload-container">
              <input
                type="file"
                id="doctor-image-upload"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="doctor-image-upload" className="upload-box">
              <div className="upload-icon">
                  <img
                    src={placeholder} // Replace with your upload icon URL
                    alt="Upload Icon"
                  />
              </div>
              <p className="upload-text">
                Drop your image here, or <span className="browse-link">browse</span>
              </p>
              <p className="supported-formats">Supports: JPG, JPEG2000, PNG</p>
              </label>
            </div>
            <div className="doctor-personal">
              <div className="personalinput-container">
                <label>First name:</label>
                <input type="text" id='fname' name='fname'/>
              </div>
              <div className="personalinput-container">
                <label>Last Name:</label>
                <input type="text" id='fname' name='fname'/>
              </div>
              <div className="personalinput-container">
                <label>Age:</label>
                <input type="text" id='fname' name='fname'/>
              </div>
              <div className="personalradio-container">
                <label>Gender</label>
                <div className="radio-input">
                  <label htmlFor="">Male: <input type="radio" id='male' name='gender'/></label>
                  <label htmlFor="">Female: <input type="radio" id='female' name='gender'/></label>
                </div>
              </div>
            </div>
          </div>
          <h2>Contact Information</h2>
          <div className="middle-doctorinput-container">
            <div className="doctor-textarea-container">
              <label htmlFor="">Address:</label>
              <textarea name="address" id="address" />
            </div>
            <div className="doctor-contactinput-container">
              <div className="doctor-emailinput">
                <label htmlFor="">Email:</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="doctor-numberinput">
                <label htmlFor="">Phone:</label>
                <input type="text" name="number" id="number" />
              </div>
            </div>
          </div>
          <h2>Professional Information</h2>
          <div className="bottom-doctorinput-container">
            <div className="doctor-input">
              <label htmlFor="">Medical Registration Number:</label>
              <input type="text" name="rnumber" id="rnumber" />
            </div>
            <div className="doctor-input">
              <label htmlFor="">Years of experience:</label>
              <input type="text" name="experience" id="experience" />
            </div>
            <div className="doctor-input">
              <label htmlFor="">Specialization:</label>
              <input type="text" name="spesiality" id="spesiality" />
            </div>
            <div className="doctor-input">
              <label htmlFor="">Type of Employement:</label>
              <div className="radio-input">
                <label htmlFor="">Part-Time : <input type="radio" name="employment" id="part-time" /></label>
                <label htmlFor="">Full-Time : <input type="radio" name="employment" id="full-time" /></label>
              </div>
            </div>
          </div>
          <div className="doctor-submit-container">
            <button type="submit">Register Now</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewDoctor;