import { v2 as cloudinary} from "cloudinary";
import Hotel from "../models/Hotel";
import Room from "../models/Room";

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

}

//Hotel specific rooms
export const getOwnerRooms = async(req, res) => {

}

//API to change the availability of the room
export const toggleRoomAvailability = async(req, res) => {

}