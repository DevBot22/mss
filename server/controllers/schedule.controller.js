
import Schedule from '../models/schedule.model.js'

export const getAllSchedules = async (req, res, next) => {
    try {
        const schedules = await Schedule.find().sort({defenseDate : 1})
        return res.status(200).json(schedules)
    } catch (error) {
        next(error)
    }
}

export const addSchedule = async (req, res, next) => {
    try {
        const {studentName, manuscriptTitle, adviser, panelMembers,
               defenseDate, room, status
             } = req.body;

        const newSchedule = new Schedule({
            studentName, manuscriptTitle, adviser, panelMembers,
               defenseDate, room, status
        })

        await newSchedule.save()
        return res.status(201).json({message: 'New Schedule added successfully ✅'})
    } catch (error) {
        next(error)
    }
}

