import express from 'express';
import PatientSchema from '../models/PatientSchema.js';

const router = express.Router();

router.post('/register/new', async (req, res)=>{
    try{
        const patient = new PatientSchema(req.body);
        await patient.save();
        res.status(201).send({message: 'Patient data saved successfully', patient});
    }catch(error){
        res.status(500).send({message: 'Error aving patient data',error});
        console.error("Error saving patient:", error.message, error.stack);
    }
});
router.get('/allpatients', async (req,res)=>{
    const {purpose} = req.query; //get purpose from query string
    try{
        const query = purpose ? { purpose } : {}; // Filter by purpose if provided
        const patients = await Patient.find(query);
        res.status(200).json(patients);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Failed to fetch patients"});
    }
});
export default router;