import express from 'express';
import { appointmentCancel, appointmentComplete, appointments, dashboard, doctorList, getProfile, loginDoctor, updateProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.post('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointments)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, dashboard)
doctorRouter.get('/profile', authDoctor, getProfile)
doctorRouter.post('/update-profile', authDoctor, updateProfile)

export default doctorRouter;