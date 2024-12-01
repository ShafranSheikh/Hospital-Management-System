import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema({
    fname:{type:String, required : true},
    lname:{type:String, required : true},
    age:{type:Number, required : true},
    data:{type:Buffer, required :true},
    contentType: { type: String, required: true },
    gender:{type:String, required: true},
    address:{type:String, required: true},
    email:{type:String, required: true},
    pnumber:{type:String, required: true},
    rnumber:{type:String, required: true},
    experience:{type:Number, required: true},
    speciality:{type:String, required: true},
    employment:{type:String, required: true},
    RegistrationDate:{type:Date, default:Date.now}
});
export default mongoose.model("Doctor", DoctorSchema);