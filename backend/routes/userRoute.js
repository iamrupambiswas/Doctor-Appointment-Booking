import express from 'express';
import { bookAppointment, cancelAppointment, getUserProfile, listAppointments, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)
userRoute.get('/getUserProfile', authUser, getUserProfile)
userRoute.post('/updateUserProfile', upload.single('image'), authUser, updateUserProfile)
userRoute.post('/bookAppointment', authUser, bookAppointment)
userRoute.post('/my-appointments', authUser, listAppointments)
userRoute.post('/cancel-appointment', authUser, cancelAppointment)

export default userRoute;