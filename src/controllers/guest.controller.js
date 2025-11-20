import Guest from "../models/guest.model.js";

export const addGuest = async (req,res)=>{
    try {
        const {name,maxInvite} = req.body
        if(!name){
            return res.status(400).json({message:"name is required"})
        }
        if(!maxInvite){
            return res.status(400).json({message:"maxInvite is required"})
        }
        const dublicate = await Guest.findOne({name})
        if(dublicate){
            return res.status(400).json({message:"This name is already occupied by other guest"})
        }
        const guest = new Guest({
            name,
            maxInvite
        })
        await guest.save();
        res.json({message:"guest added successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in addGuest controller",error.message)
    }
}

export const showAllGuest=async(req,res)=>{
    try {
        const guests = await Guest.find()
        if(guests.length===0){
            return res.status(404).json({message:"No guest found"})
        }
        res.json(guests)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in showAllGuest controller",error.message)
    }
}

export const showSpecificGuest=async(req,res)=>{
    try {
        const guestId = req.params.id;
        if(!guestId){
            res.status(400).json({message:"Guest id is required"})
        }
        const guest  = await Guest.findById(guestId)
        if(!guest){
            return res.status(400).json({message:"guest not found"})
        }
        res.json(guest);
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in showSpecificGuest controller",error.message)
    }
}

export const addConfirmedGuest=async(req,res)=>{
    try {
        const {id,confirmedInvites} = req.body
        if(!id){
            return res.status(400).json({message:"guest id is required"})
        }
        const updateGuest = await Guest.findByIdAndUpdate(id,{confirmed:true,confirmedInvites})
        if(!updateGuest){
            return res.status(404).json({message:"no guest are found"})
        }
        res.status(200).json({message:"your presence is confirmed"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        console.log("error in addConfirmedGuest controller",error.message)
    }
}