import mongoose from "mongoose";
 const GuestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxInvite:{
        type:Number,
        required:true
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    confirmedInvites:{
        type:Number,
        default:0
    },
 })

 const Guest = mongoose.model("Guest",GuestSchema);
 export default Guest;