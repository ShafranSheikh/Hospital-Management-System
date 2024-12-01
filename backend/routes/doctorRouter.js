import express from "express";
import DoctorSchema from "../models/DoctorSchema.js";
import multer from "multer";
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

router.get('/count', async (req,res)=>{
    try{
        const count = await DoctorSchema.countDocuments();
        res.status(200).json({ count });
    }catch(error){
        res.status(500).json({message: "Failed to fetch doctor count", error});
    }
})
export default router