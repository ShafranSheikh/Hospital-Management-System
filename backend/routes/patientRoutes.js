import express from 'express';
import PatientSchema from '../models/PatientSchema.js';
import DischargedPatientCountSchema from '../models/DischargedPatientCountSchema.js';
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
        const patients = await PatientSchema.find(query);
        res.status(200).json(patients);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Failed to fetch patients"});
    }
});

router.get('/details', async (req,res)=>{
    try{
        const patientDetails = await PatientSchema.find({});
        const patientData = patientDetails.map(details=>({
        id: details._id,
        fname: details.firstName,
        lname: details.lastName,
        age: details.age,
        gender: details.gender,
        address: details.address,
        email: details.email,
        purpose: details.purpose,
        phone: details.phone,
    }));
    res.json(patientData);
    }catch(error){
        console.error('Error fetching Patient Details:', error);
        res.status(500).json({ error: 'Failed to fetch Patient details' });        
    }
});
router.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        await PatientSchema.findByIdAndDelete(id);
        //Logic for increment the discharged patient count
        const dischargedPatient = await DischargedPatientCountSchema.findOneAndUpdate(
            {},
            {$inc: {count: 1}},
            {upsert: true, new:true}
        );
        res.status(200).json({message: 'Patient Deleted sucessfully', dischargedPatient});
    }catch(error){
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
});
router.get('/count', async (req,res)=>{
    try{
        const count = await PatientSchema.countDocuments();
        res.status(200).json({count});
    }catch(error){
        res.status(500).json({message: "Failed to fetch Patient count", error});
    }
})
router.get('/discharged/count', async (req,res)=>{
    try{
        const dischargedCount = await DischargedPatientCountSchema.findOne({});
        const count = dischargedCount ? dischargedCount.count : 0;
        res.status(200).json({count});
    }catch(error){
        console.error('Error fetching Discharged patient count: ', error);
        res.status(500).json({error: 'Failed to fetch discharged patient count'});
    }
})
export default router;