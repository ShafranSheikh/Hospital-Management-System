import React from 'react'
import '../styles/newdoctor.css';
import placeholder from '../assets/photo.png'
const NewDoctor = () => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file.name);
        // Handle file upload logic here
      }
    };

  return (
    <>
      <div className="doctor-form-container-main">
        <form action="">
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
                <label>Speciality:</label>
                <input type="text" id='fname' name='fname'/>
              </div>
            </div>
          </div>
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
        </form>
      </div>
    </>
  )
}

export default NewDoctor;