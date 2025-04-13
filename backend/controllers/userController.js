import validator from "validator"
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"
import doctorModel from "../models/doctorsModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import appointmentModel from "../models/appointmentModel.js"


// API to register user
const registerUser = async (req,res) => {
    try {

        const { name, email, password} = req.body

        if (!name || !password || !email) {
            return res.json({success:false,message:"Missing Details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false,message:"Enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true, message:"User registered successfully", token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


// API for user login
const loginUser = async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false, message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, message:"Login successful", token})
        } else {
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// API to get user profile details
const getUserProfile = async (req,res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// API to update user profile details
const updateUserProfile = async (req,res) => {
    try {

        const {userId, name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success:false, message:"Missing Details"})
        }

        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

        await userModel.findByIdAndUpdate(userId, {name, phone, address:parsedAddress, dob, gender})

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})
        }
        res.json({success:true, message:"Profile updated successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


// API to book appointment
const bookAppointment = async (req,res) => {

    try {

        const {docId, userId, slotDate, slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({success:false, message:"Doctor is not available"})
        }

        let slots_booked = docData.slots_booked

        // checking for the slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false, message:"Slot is not available"})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        
        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // Save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:"Appointment booked successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


// API to get user appointments
const listAppointments = async (req, res) => {

    try {

        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {

    try {

        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing doctor slot
         const {docId, slotDate, slotTime} = appointmentData
         const doctorData = await doctorModel.findById(docId)

         let slots_booked = doctorData.slots_booked

         slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)

         await doctorModel.findByIdAndUpdate(docId, {slots_booked})

         res.json({success:true, message:"Appointment cancelled successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
} 


export {registerUser, loginUser, getUserProfile, updateUserProfile, bookAppointment, listAppointments, cancelAppointment}