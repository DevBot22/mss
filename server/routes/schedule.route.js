import { Router } from "express";
import { addSchedule, deleteSchedule, getAllSchedules, getSchedule, updateSchedule } from "../controllers/schedule.controller.js";

const scheduleRoutes = Router()

scheduleRoutes.get('/', getAllSchedules)
scheduleRoutes.get('/:id', getSchedule)
scheduleRoutes.post('/new-schedule', addSchedule)
scheduleRoutes.put('/update-schedule/:id', updateSchedule)
scheduleRoutes.delete('/delete-schedule', deleteSchedule)


export default scheduleRoutes