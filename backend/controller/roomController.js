import { v2 as cloudinary} from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//Creating new room for hotel
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});
        
        if(!hotel){
            return res.json({success:false, message:"Hotel Not Found"});
        }

        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        const image = await Promise.all(uploadImages);

        await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images: image,
        })

        res.json({success:true, message:"Room created successfully"});
    } catch (error) {
        res.json({success})
    }
}

//Getting all the rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable:true}).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1});
        res.json({success:true, rooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

//Hotel specific rooms
export const getOwnerRooms = async(req, res) => {
    try {
        const hotelData = await Hotel({owner:req.auth.userId});
        const rooms = await Room.find({hotel:hotelData._id.toString()}).populate("hotel");
        res.json({success:true, rooms});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
    
}

//API to change the availability of the room
export const toggleRoomAvailability = async(req, res) => {

    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        res.json({success:true, message:"Room availability updated successfully"})
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}