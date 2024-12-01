import express from "express";
import DoctorSchema from "../models/DoctorSchema.js";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/register', upload.single('image'), async (req,res)=>{
    try{
        const doctorImage = req.file;
        const {fname, lname, age, gender,address,email,pnumber,rnumber,experience,speciality,employment } = req.body;
        const newDoctor = new DoctorSchema({fname, lname, age,data:doctorImage.buffer, gender,address,email,pnumber,rnumber,experience,speciality,employment});
        await newDoctor.save();
        res.status(200).json({ message: 'Doctor data Added to the database successfully' });
    }catch(error){
        console.error('Error uploading Doctor Details:', error);
        res.status(500).json({ error: 'Failed to upload Doctor Item' });
    }
});
export default router