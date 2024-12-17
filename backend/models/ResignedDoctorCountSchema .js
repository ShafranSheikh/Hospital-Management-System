import mongoose from "mongoose";
const ResignedDoctorCountSchema  = new mongoose.Schema({
    count:{
        type: Number,
        required: true,
        default: 0,
    },
});

export default mongoose.model("ResignedDoctorCount", ResignedDoctorCountSchema);