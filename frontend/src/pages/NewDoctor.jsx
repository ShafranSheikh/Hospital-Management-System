import React, { useState } from 'react';
import '../styles/newdoctor.css';
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/photo.png';
import axios from 'axios';

const NewDoctor = () => {
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setPnumber] = useState('');
  const [rnumber, setRnumber] = useState('');
  const [experience, setExperience] = useState('');
  const [speciality, setSpeciality] = useState("");
  const [employment, setEmployment] = useState("");
  
  const [errors, setErrors] = useState({});  // State for validation errors
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmploymentChange = (event) => {
    setEmployment(event.target.value);
  };

  const validate = () => {
    const validationErrors = {};

    if (!fname.trim()) {
      validationErrors.fname = "First name is required";
    }

    if (!lname.trim()) {
      validationErrors.lname = "Last name is required";
    }

    if (!age || isNaN(age) || age <= 0) {
      validationErrors.age = "Please enter a valid age";
    }

    if (!gender) {
      validationErrors.gender = "Gender is required";
    }

    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!pnumber.trim() || !/^\d{10}$/.test(pnumber)) {
      validationErrors.pnumber = "Please enter a valid phone number (10 digits)";
    }

    if (!rnumber.trim()) {
      validationErrors.rnumber = "Medical registration number is required";
    }

    if (!experience || isNaN(experience) || experience <= 0) {
      validationErrors.experience = "Please enter valid years of experience";
    }

    if (!speciality.trim()) {
      validationErrors.speciality = "Specialization is required";
    }

    if (!employment) {
      validationErrors.employment = "Employment type is required";
    }

    if (!image) {
      validationErrors.image = "Doctor's image is required";
    }

    return validationErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append('image', image);
      formdata.append('fname', fname);
      formdata.append('lname', lname);
      formdata.append('age', age);
      formdata.append('gender', gender);
      formdata.append('address', address);
      formdata.append('email', email);
      formdata.append('pnumber', pnumber);
      formdata.append('rnumber', rnumber);
      formdata.append('experience', experience);
      formdata.append('speciality', speciality);
      formdata.append('employment', employment);

      try {
        const response = await axios.post("http://localhost:3000/api/doctors/register", formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        alert('Doctor Registered Successfully!!');
        window.location.reload();
      } catch (error) {
        console.error('Error registering Doctor', error);
      }
    } catch (error) {
      console.error('Error Connecting to the server', error);
    }
  };

  return (
    <>
      <div className="patient-header">
        <h1>Doctors</h1>
        <button onClick={() => navigate('/tables')}>Back to Tables</button>
      </div>
      <div className="doctor-form-container-main">
        <form onSubmit={handleFormSubmit}>
          <h1>Doctor Registration</h1>
          <h2>Personal Information</h2>
          <div className="top-doctorinput-container">
            <div className={`image-upload-container ${image ? 'image-added' : ''}`}>
              <input
                type="file"
                id="doctor-image-upload"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleFileChange}
                name='image'
                required
              />
              <label htmlFor="doctor-image-upload" className="upload-box">
                <div className="upload-icon">
                  <img src={placeholder} alt="Upload Icon" />
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
                <input type="text" id='fname' name='fname' value={fname} onChange={(e) => setFname(e.target.value)} required />
                {errors.fname && <span className="error">{errors.fname}</span>}
              </div>
              <div className="personalinput-container">
                <label>Last Name:</label>
                <input type="text" id='lname' name='lname' value={lname} onChange={(e) => setLname(e.target.value)} required />
                {errors.lname && <span className="error">{errors.lname}</span>}
              </div>
              <div className="personalinput-container">
                <label>Age:</label>
                <input type="text" id='age' name='age' value={age} onChange={(e) => setAge(e.target.value)} required />
                {errors.age && <span className="error">{errors.age}</span>}
              </div>
              <div className="personalradio-container">
                <label>Gender</label>
                <div className="radio-input">
                  <label htmlFor="">Male: &nbsp;<input type="radio" id='male' name='gender' value='male' checked={gender === 'male'} onChange={handleGenderChange} /></label>
                  <label htmlFor="">Female: &nbsp;<input type="radio" id='female' name='gender' value='female' checked={gender === 'female'} onChange={handleGenderChange} /></label>
                </div>
                {errors.gender && <span className="error">{errors.gender}</span>}
              </div>
            </div>
          </div>
          <h2>Contact Information</h2>
          <div className="middle-doctorinput-container">
            <div className="doctor-textarea-container">
              <label htmlFor="">Address:</label>
              <textarea name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="doctor-contactinput-container">
              <div className="doctor-emailinput">
                <label htmlFor="">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="doctor-numberinput">
                <label htmlFor="">Phone:</label>
                <input type="text" name="pnumber" id="pnumber" value={pnumber} onChange={(e) => setPnumber(e.target.value)} required />
                {errors.pnumber && <span className="error">{errors.pnumber}</span>}
              </div>
            </div>
          </div>
          <h2>Professional Information</h2>
          <div className="bottom-doctorinput-container">
            <div className="doctor-input">
              <label htmlFor="">Medical Registration Number:</label>
              <input type="text" name="rnumber" id="rnumber" value={rnumber} onChange={(e) => setRnumber(e.target.value)} required />
              {errors.rnumber && <span className="error">{errors.rnumber}</span>}
            </div>
            <div className="doctor-input">
              <label htmlFor="">Years of experience:</label>
              <input type="text" name="experience" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
              {errors.experience && <span className="error">{errors.experience}</span>}
            </div>
            <div className="doctor-input">
              <label htmlFor="">Specialization:</label>
              <input type="text" name="speciality" id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
              {errors.speciality && <span className="error">{errors.speciality}</span>}
            </div>
            <div className="doctor-input">
              <label htmlFor="">Type of Employment:</label>
              <div className="radio-input">
                <label htmlFor="">Part-Time :&nbsp; <input type="radio" name="employment" id="part-time" value='part-time' checked={employment === 'part-time'} onChange={handleEmploymentChange} /></label>
                <label htmlFor="">Full-Time :&nbsp; <input type="radio" name="employment" id="full-time" value='full-time' checked={employment === 'full-time'} onChange={handleEmploymentChange} /></label>
              </div>
              {errors.employment && <span className="error">{errors.employment}</span>}
            </div>
          </div>
          <div className="doctor-submit-container">
            <button type="submit">Register Now</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewDoctor;
