import { Router } from "express";
import { addSchedule, deleteAllSchedules, deleteSchedule, getAllSchedules, getMySchedules, getSchedule, updateSchedule } from "../controllers/schedule.controller.js";
import { scheduleValidator, validateRequest, validateUpdateStatusOnly } from "../middlewares/schedule.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const scheduleRoutes = Router()

scheduleRoutes.get('/', protect, getAllSchedules)
scheduleRoutes.get('/:id', protect, getSchedule)
scheduleRoutes.post('/new-schedule', protect, authorizeRoles('student'),scheduleValidator, validateRequest,  addSchedule)
scheduleRoutes.put('/update-schedule/:id', protect, authorizeRoles('admin'),validateUpdateStatusOnly, updateSchedule)
scheduleRoutes.delete('/delete-schedule/:id', protect, authorizeRoles('admin'),deleteSchedule)
scheduleRoutes.delete('/empty-schedules', deleteAllSchedules)
scheduleRoutes.get('/my-schedules', protect, authorizeRoles('student'), getMySchedules)

export default scheduleRoutes   