import { Router } from "express";
import { addSchedule, deleteAllSchedules, deleteSchedule, getAllSchedules, getSchedule, updateSchedule } from "../controllers/schedule.controller.js";
import { scheduleValidator, validateRequest, validateUpdateStatusOnly } from "../middlewares/schedule.middleware.js";

const scheduleRoutes = Router()

scheduleRoutes.get('/', getAllSchedules)
scheduleRoutes.get('/:id', getSchedule)
scheduleRoutes.post('/new-schedule',scheduleValidator, validateRequest,  addSchedule)
scheduleRoutes.put('/update-schedule/:id', validateUpdateStatusOnly, updateSchedule)
scheduleRoutes.delete('/delete-schedule', deleteSchedule)
scheduleRoutes.delete('/empty-schedules', deleteAllSchedules)

export default scheduleRoutes   