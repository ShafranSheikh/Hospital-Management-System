import React,{useState} from 'react'
import '../styles/newdoctor.css';
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/photo.png';
import axios from 'axios';
const NewDoctor = () => {
  const[image, setImage] = useState(null);
  const[fname, setFname] = useState("");
  const[lname, setLname] = useState("");
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail]= useState("");
  const [pnumber, setPnumber] = useState('');
  const[rnumber, setRnumber] = useState('');
  const [experience, setExperience]= useState('');
  const [speciality, setSpeciality] = useState("");
  const [employment, setEmployment] = useState("");
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const handleGenderChange = (event) =>{
    setGender(event.target.value);
  }
  const handleEmploymentChange = (event)=>{
    setEmployment(event.target.value);
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
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
      try{
        const response = await axios.post("http://localhost:3000/api/doctors/register", formdata,{
          headers:{
            'Content-Type': 'multipart/form-data'
          },
        });
        alert ('Doctor Registered Successfully!!');
        window.location.reload();
      }catch(error){
        console.error('Error registering Doctor',error);
      }
    }catch(error){
      console.error('Error Connecting to the server', error);
    }
  }

  return (
    <>
      <div className="patient-header">
        <h1>Doctors</h1>
        <button onClick={()=> navigate('/tables')}>Back to Tables</button>
      </div>
      <div className="doctor-form-container-main">
        <form onSubmit={handleFormSubmit}>
        <h1>Doctor  Reggistration</h1>
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
                <input type="text" id='fname' name='fname'value={fname} onChange={(e)=>setFname(e.target.value)}required/>
              </div>
              <div className="personalinput-container">
                <label>Last Name:</label>
                <input type="text" id='lname' name='lname'value={lname} onChange={(e)=>setLname(e.target.value)}required/>
              </div>
              <div className="personalinput-container">
                <label>Age:</label>
                <input type="text" id='age' name='age'value={age} onChange={(e)=>setAge(e.target.value)} required/>
              </div>
              <div className="personalradio-container">
                <label>Gender</label>
                <div className="radio-input">
                  <label htmlFor="">Male: &nbsp;<input type="radio" id='male' name='gender'value='male' checked={gender === 'male'} onChange={handleGenderChange}/></label>
                  <label htmlFor="">Female: &nbsp;<input type="radio" id='female' name='gender'value='female' checked={gender === 'female'} onChange={handleGenderChange}/></label>
                </div>
              </div>
            </div>
          </div>
          <h2>Contact Information</h2>
          <div className="middle-doctorinput-container">
            <div className="doctor-textarea-container">
              <label htmlFor="">Address:</label>
              <textarea name="address" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
            </div>
            <div className="doctor-contactinput-container">
              <div className="doctor-emailinput">
                <label htmlFor="">Email:</label>
                <input type="email" name="email" id="email"value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
              </div>
              <div className="doctor-numberinput">
                <label htmlFor="">Phone:</label>
                <input type="text" name="pnumber" id="pnumber" value={pnumber} onChange={(e)=>setPnumber(e.target.value)} required/>
              </div>
            </div>
          </div>
          <h2>Professional Information</h2>
          <div className="bottom-doctorinput-container">
            <div className="doctor-input">
              <label htmlFor="">Medical Registration Number:</label>
              <input type="text" name="rnumber" id="rnumber" value={rnumber} onChange={(e)=>setRnumber(e.target.value)} required/>
            </div>
            <div className="doctor-input">
              <label htmlFor="">Years of experience:</label>
              <input type="text" name="experience" id="experience" value={experience} onChange={(e)=>setExperience(e.target.value)} required />
            </div>
            <div className="doctor-input">
              <label htmlFor="">Specialization:</label>
              <input type="text" name="spesiality" id="spesiality" value={speciality} onChange={(e)=>setSpeciality(e.target.value)} required />
            </div>
            <div className="doctor-input">
              <label htmlFor="">Type of Employement:</label>
              <div className="radio-input">
                <label htmlFor="">Part-Time :&nbsp; <input type="radio" name="employment" id="part-time" value='part-time'checked={employment === 'part-time'} onChange={handleEmploymentChange}/></label>
                <label htmlFor="">Full-Time :&nbsp; <input type="radio" name="employment" id="full-time" value='full-time'checked={employment === 'full-time'} onChange={handleEmploymentChange}/></label>
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