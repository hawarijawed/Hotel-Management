import Hotel from "../models/Hotel.js";
import User from '../models/User.js';

export const registerHotel = async (req , res) =>{
    try {
        const {name, address,contact, city } = req.body;
        const owner = req.user._id;
        console.log("Owner ID:", owner);

        
        //Check if the user is registered already
        const hotel = await Hotel.findOne({owner});
        if(hotel){
            res.json({success:false, message:"Hotel already registered"});
        }

        await Hotel.create({name, address, city, contact, owner});
        await User.findByIdAndUpdate(owner, {role:"hotelOwner"});
        
        res.json({success:true, message:"Hotel Registered Successfully"})
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}