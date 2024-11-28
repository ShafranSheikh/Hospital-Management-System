import express from 'express';
import PatientSchema from '../models/PatientSchema.js';

const router = express.Router();

router.post('/register/patient', async (req, res)=>{
    try{
        const patient = new PatientSchema(req.body);
        await patient.save();
        res.status(201).send({message: 'Patient data saved successfully', patient});
    }catch(error){
        res.status(500).send({message: 'Error aving patient data',error});
        console.error("Error saving patient:", error.message, error.stack);
    }
});

export default router;