import mongoose from "mongoose";
const DischargedPatientCountSchema = new mongoose.Schema({
    count:{
        type: Number,
        required:true,
        default:0,
    },
})
export default mongoose.model('DischargedPatientCount', DischargedPatientCountSchema);