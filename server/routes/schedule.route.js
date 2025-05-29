import { Router } from "express";
import { addSchedule, deleteAllSchedules, deleteMySchedule, deleteSchedule, getAdviserSchedules, getAllSchedules, getMySchedules, getSchedule, updateAdviserScheduleStatus, updateMySchedule, updateSchedule } from "../controllers/schedule.controller.js";
import { scheduleValidator, validateRequest, validateUpdateStatusOnly } from "../middlewares/schedule.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const scheduleRoutes = Router()

scheduleRoutes.get('/my-schedules', protect, authorizeRoles('student'), getMySchedules);
scheduleRoutes.put('/my-schedules/:id', protect, authorizeRoles('student'), scheduleValidator, validateRequest, updateMySchedule);
scheduleRoutes.delete('/my-schedules/:id', protect, authorizeRoles('student'), deleteMySchedule)

scheduleRoutes.post('/new-schedule', protect, authorizeRoles('student'), scheduleValidator, validateRequest, addSchedule);

//Adviser only routes
scheduleRoutes.get('/adviser/schedules', protect, authorizeRoles('adviser'), getAdviserSchedules )
scheduleRoutes.patch('/adviser/update-status/:id', protect, authorizeRoles('adviser'), validateUpdateStatusOnly, validateRequest, updateAdviserScheduleStatus)


scheduleRoutes.put('/update-schedule/:id', protect, authorizeRoles('admin'), validateUpdateStatusOnly, updateSchedule);
scheduleRoutes.delete('/delete-schedule/:id', protect, authorizeRoles('admin'), deleteSchedule);
scheduleRoutes.delete('/empty-schedules', protect, authorizeRoles('admin'), deleteAllSchedules);

scheduleRoutes.get('/', protect, getAllSchedules);
scheduleRoutes.get('/:id', protect, getSchedule);

export default scheduleRoutes   