
import Schedule from '../models/schedule.model.js'

export const getAllSchedules = async (req, res, next) => {
    try {
        const schedules = await Schedule.find().sort({defenseDate : 1})

       if (schedules.length === 0) {
        return res.status(404).json({ message: "🚫 No schedules found." });
        }
        
        return res.status(200).json(schedules)
    } catch (error) {
        next(error)
    }
}

export const addSchedule = async (req, res, next) => {
    try {
        const { section ,manuscriptTitle, adviser, panelMembers,
               defenseDate, room, status
             } = req.body;

        const studentName = req.user.name //from token
        const studentId = req.user._id || req.user.id

          // Check if schedule for this student on this date already exists
        const existingSchedule = await Schedule.findOne({ studentId, defenseDate });
         if (existingSchedule) {
         return res.status(400).json({ message: 'Schedule for this student on this date already exists.' });
        }

        const newSchedule = new Schedule({
           studentId ,studentName, section, manuscriptTitle, adviser, panelMembers,
               defenseDate, room, status
        })

        await newSchedule.save()
        return res.status(201).json({message: 'New Schedule added successfully ✅'})
    } catch (error) {
        next(error)
    }
}

export const getSchedule = async (req, res, next) => {
    try {
        const schedule = await Schedule.findById(req.params.id)

        if(!schedule){
            return res.status(404).json({message: 'No schedule found'})
        }

        res.status(200).json(schedule)

    } catch (error) {
        next(error)
    }
}

export const updateSchedule = async (req, res, next) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        if(!updatedSchedule){
            return res.status(404).json({message: 'No schedule found!'})
        }

        res.status(201).json({message: 'Schedule has been updated'})

    } catch (error) {
        next(error)
    }
}

export const deleteSchedule = async (req, res, next) => {
    try {
        const deleteSchedule = await Schedule.findByIdAndDelete(req.params.id)

        if(!deleteSchedule){
            return res.status(404).json({message: 'No schedule found'})
        }

        res.status(200).json({message: 'Schedule has been deleted successfuly', deleteSchedule})

    } catch (error) {
        next(error)
    }
}

export const deleteAllSchedules = async (req, res, next) => {
    try {
        await Schedule.deleteMany({})
        return res.status(200).json({message: 'All schedules have been delete'})
    } catch (error) {
        next(error)
    }
}

export const getMySchedules = async (req, res, next) => {
    try {
        const studentId = req.user._id // from decoded token
        const mySchedules = await Schedule.find({studentId})

        if(!mySchedules) {
            return res.status(404).json({message: 'No schedule found'})
        }

        res.status(200).json(mySchedules)
    } catch (error) {
        next(error)
    }
}