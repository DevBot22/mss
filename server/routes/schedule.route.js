import { Router } from "express";
import { addSchedule, getAllSchedules } from "../controllers/schedule.controller.js";

const scheduleRoutes = Router()

scheduleRoutes.get('/', getAllSchedules)
scheduleRoutes.post('/new-schedule', addSchedule)


export default scheduleRoutes