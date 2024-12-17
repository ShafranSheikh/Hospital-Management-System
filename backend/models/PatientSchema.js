import mongoose from 'mongoose';
const PatientSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required: true},
    age:{type:Number, required : true},
    gender:{type:String, required:true},
    address:{type:String, required:true},
    email:{type:String, required:true, match:/.+@.+\..+/ , unique: true},
    purpose:{type:String, required: true},
    phone:{type:String, required:true},
    registrationDate:{type:Date, default:Date.now}
});
export default mongoose.model("Patient", PatientSchema);