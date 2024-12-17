import express from "express";
import DoctorSchema from "../models/DoctorSchema.js";
import multer from "multer";
import ResignedDoctorCountSchema from "../models/ResignedDoctorCountSchema .js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const doctorImage = req.file;
        const { fname, lname, age, gender, address, email, pnumber, rnumber, experience, speciality, employment } = req.body;
        if (!doctorImage) {
            return res.status(400).json({ error: 'Image file is required' });
        }
        if (!['image/jpeg', 'image/png'].includes(doctorImage.mimetype)) {
            return res.status(400).json({ error: 'Only JPEG and PNG images are allowed' });
        }
        const newDoctor = new DoctorSchema({
            fname,
            lname,
            age: Number(age),
            data: doctorImage.buffer,
            contentType: doctorImage.mimetype,
            gender,
            address,
            email,
            pnumber,
            rnumber,
            experience: Number(experience),
            speciality,
            employment,
        });
        await newDoctor.save();
        res.status(200).json({ message: 'Doctor data added to the database successfully' });
    } catch (error) {
        console.error('Error uploading Doctor Details:', error.errors || error);
        res.status(500).json({ error: 'Failed to upload Doctor details' });
    }
});  

router.get('/details', async (req,res)=>{
    try{
        const doctorDetails = await DoctorSchema.find({});
        const doctorData = doctorDetails.map(details =>({
            id: details._id,
            fname: details.fname,
            lname: details.lname,
            age: details.age,
            data: `data:${details.contentType};base64,${details.data.toString('base64')}`,
            contentType: details.contentType,
            gender: details.gender,
            address:details.address,
            email: details.email,
            pnumber: details.pnumber,
            rnumber: details.rnumber,
            experience:details.experience,
            speciality: details.speciality,
            employment: details.employment,
        }));
        res.json(doctorData);
    }catch(error){
        console.error('Error fetching Doctor Details:', error);
        res.status(500).json({ error: 'Failed to fetch Doctor details' });
    }
});
router.get('/details/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const doctor = await DoctorSchema.findById(id);
        if(!doctor){
            return res.status(404).json({error: 'Doctor not Found'});
        }
        const doctorData = {
            id: doctor._id,
            fname: doctor.fname,
            lname: doctor.lname,
            age: doctor.age,
            data: `data:${doctor.contentType};base64,${doctor.data.toString('base64')}`,
            gender: doctor.gender,
            address: doctor.address,
            email: doctor.email,
            pnumber: doctor.pnumber,
            rnumber: doctor.rnumber,
            experience: doctor.experience,
            speciality: doctor.speciality,
            employment: doctor.employment,
        }
        res.json(doctorData);
    }catch(error){
        console.error('Error fetching doctor details by id:', error);
        res.status(500).json({error: 'failed to fetch doctor details by id'});
    }
});
router.delete('/details/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteDocotr = await DoctorSchema.findByIdAndDelete(id);
        if(!deleteDocotr){
            return res.status(404).json({error: 'Docotor Not Found'});
        }
        //Logic for increment the resigned doctor count
        const resignedCount = await ResignedDoctorCountSchema.findOneAndUpdate(
            {}, //Match all since it's a single document
            {$inc: {count : 1}},// increment the count by 1
            {upsert: true, new:true}// create the document if it doesn't exist
        );
        res.status(200).json({message: 'Doctor deleted Successfully', resignedCount});
    }catch(error){
        console.log('Error deleting doctor', error);
        res.status(500).json({error: 'Failed to delete doctor'});
    }
})
router.put('/details/:id', upload.single('image'), async (req,res)=>{
    try{
        const {id} = req.params;
        const doctorImage = req.file;
        const { fname, lname, age, gender, address, email, pnumber, rnumber, experience, speciality, employment } = req.body;
        const updateData  ={
            fname,lname,age: Number(age),gender,address,email,pnumber,rnumber,experience:Number(experience),speciality, employment,
        };
        //handle imageupload if provided
        if(doctorImage){
            updateData.data = doctorImage.buffer;
            updateData.contentType = doctorImage.mimetype;
        }
        const updateDoctor = await DoctorSchema.findByIdAndUpdate(id, updateData,{new:true});
        if(!updateDoctor){
            return res.status(404).json({error: 'Doctor Not Found'});
        }
        res.status(200).json({message: 'Doctor Updated Successfully', doctor: updateDoctor})
    }catch(error){
        console.error('Error updating doctor:', error);
        res.status(500).json({error: 'Failed to update doctor'})
    }
});
router.get('/count', async (req,res)=>{
    try{
        const count = await DoctorSchema.countDocuments();
        res.status(200).json({ count });
    }catch(error){
        res.status(500).json({message: "Failed to fetch doctor count", error});
    }
});
router.get('/resigned/count', async (req,res)=>{
    try{
        const resignedCount = await ResignedDoctorCountSchema.findOne({});
        const count = resignedCount ? resignedCount.count : 0
        res.status(200).json({count});
    }catch(error){
        console.error('Error fetching resigned doctor count: ', error);
        res.status(500).json({error: 'Failed to fetch resigned doctor count'});
    }
});
export default router