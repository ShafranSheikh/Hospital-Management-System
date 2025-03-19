import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import MedicationIcon from '@mui/icons-material/Medication';
import '../styles/doctordetails.css'
import Loader from '../components/loader/loader';
const DoctorDetails = () => {
    const {id} = useParams(); //Extract doctor id from url
    const navigate = useNavigate();
    const [doctorDetails, setDoctrrDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData]  = useState({});
    useEffect(()=>{
        const fetchDoctorDetails  = async ()=>{
            try{
                const response  = await axios.get(`http://localhost:3000/api/doctors/details/${id}`);
                setDoctrrDetails(response.data);
                setFormData(response.data); //pre-fill form with existing details
            }catch(error){
                console.error('Error fetching doctor details:', error);
            };
        };
        fetchDoctorDetails();
    },[id]);
    //handle form filed changes
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    //handle form submission for updates
    const updateDoctor = async (e) =>{
        e.preventDefault();
        try{
            const formDataObject = new FormData();
            for( let key in formData){
                formDataObject.append(key, formData[key]);
            }
            const response = await axios.put(`http://localhost:3000/api/doctors/details/${id}`, formDataObject,{
                headers:{'Content-Type': 'multipart/form-data'},
            });
            alert('Doctor details updated successfully');
            setDoctrrDetails(response.data.doctor); // Update displayed details
            setEditMode(false); // exit edit mode
        }catch(error){
            console.error('Error updating doctor', error);
            alert('Failed to update doctor details');
        }
    };
    const deleteDoctor = async ()=>{
        try{
            await axios.delete(`http://localhost:3000/api/doctors/details/${id}`);
            alert('Docotor deleted successfully');
            navigate('/doctor/overview');
        }catch(error){
            console.error('Error deleting doctor', error);
            alert('Failed to delete docotr');
        }
    };

    if(!doctorDetails){
        return <Loader/>;
    }
    return (
        <>
        <div className="doctor-header">
            <button onClick={()=> navigate('/doctor/overview')}>Back to Doctor Overview</button>
        </div>
        <div className='doctor-details-container'>
            {editMode ? (
                <div className="doctor-update-form" >
                    <h1>Update Doctor Details</h1>
                    <form onSubmit={updateDoctor}>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                            required
                        />
                        <input
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            placeholder="Gender"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="pnumber"
                            value={formData.pnumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            required
                        />
                        <input
                            type="text"
                            name="rnumber"
                            value={formData.rnumber}
                            onChange={handleInputChange}
                            placeholder="Registration Number"
                            required
                        />
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="Years of Experience"
                            required
                        />
                        <input
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleInputChange}
                            placeholder="Speciality"
                            required
                        />
                        <input
                            type="text"
                            name="employment"
                            value={formData.employment}
                            onChange={handleInputChange}
                            placeholder="Type of Employment"
                            required
                        />
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        />
                        <div className="update-button-container">
                            <button type="submit">Update Doctor <BrowserUpdatedIcon/></button>
                            <button type="button" onClick={() => setEditMode(false)}>Cancel <CancelIcon/></button>
                        </div>
                        
                </form>
                </div>
            ) : (
                <>
                    <div className="doctor-personal-details">
                        <h1>Doctor Personal Details <PersonIcon fontSize='large'/></h1>
                        <div className="doctor-personal-content-container">
                            <div className="doctor-image-container">
                                <img src={doctorDetails.data} alt="Doctor" loading='lazy'/>
                            </div>
                            <div className="personal-content">
                                <p><span>Full Name:</span>&nbsp; {doctorDetails.fname} {doctorDetails.lname}</p>
                                <p><span>Age:</span> &nbsp;{doctorDetails.age}</p>
                                <p><span>Gender:</span> &nbsp;{doctorDetails.gender}</p>
                                <p><span>ID: </span>&nbsp;{doctorDetails.rnumber}</p>
                            </div>
                            <div className="doctor-manager-container">
                                <button onClick={() => setEditMode(true)}>Update Doctor Details <BrowserUpdatedIcon/> </button>
                                <button onClick={deleteDoctor}>Remove Doctor <DeleteIcon fontSize='medium'/> </button>
                            </div>
                        </div>
                    </div>
                    <div className="doctor-contact-information">
                        <h1>Doctor Contact details <ContactsIcon fontSize='large' /></h1>
                        <div className="doctor-contact-content-container">
                            <p><span>Address:</span>&nbsp; {doctorDetails.address}</p>
                            <p><span>Email:</span>&nbsp;{doctorDetails.email}</p>
                            <p> <span>Phone:</span>&nbsp;{doctorDetails.pnumber}</p>
                        </div>
                    </div>
                    <div className="doctor-professional-details">
                        <h1>Doctor Professional Details <MedicationIcon fontSize='large'/></h1>
                        <div className="doctor-prefessional-content-container">
                            <p><span>Years of experience:</span> &nbsp;{doctorDetails.experience}</p>
                            <p><span>Specialization:</span>&nbsp; {doctorDetails.speciality}</p>
                            <p> <span>Type of Employement: </span>&nbsp;{doctorDetails.employment}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
        </>
    )
}

export default DoctorDetails