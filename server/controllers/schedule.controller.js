
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

        if (mySchedules.length === 0) {
          return res.status(404).json({ message: 'No schedule found' });
        }

        res.status(200).json(mySchedules)
    } catch (error) {
        next(error)
    }
}

export const updateMySchedule = async (req, res, next) => {
    try {
        
        const studentId = req.user._id
        const scheduleId = req.params.id
        
        //Find schedule 
        const schedule = await Schedule.findOne({_id : scheduleId, studentId})

        if(!schedule){
            return res.status(404).json({message: 'Schedule not found'})
        }

        if(schedule.status !== 'pending'){
            return res.status(400).json({message: 'Only pending schedules can be edited'})
        }

        const fieldsToUpdate = req.body

        const updated = await Schedule.findByIdAndUpdate(scheduleId, fieldsToUpdate, 
            {new: true}
        )

        res.status(200).json({
            message: 'Schedule updated successfully',
            updated
        })

    } catch (error) {
        next(error)
    }
}

export const deleteMySchedule = async (req, res, next) => {
    try {

        const studentId = req.user._id
        const scheduleId = user.params.id

        //Find schedule
        const schedule = await Schedule.findOne({_id: scheduleId, studentId})

        if(!schedule){
            return res.status(404).json({message: 'Schedule not found'})
        }

        if (schedule.status === 'approved') {
        return res.status(403).json({ message: 'Cannot delete an approved schedule ❌' });
        }


        await Schedule.findByIdAndDelete(scheduleId)
          return res.status(200).json({ message: '✅ Your schedule has been deleted successfully' });
    } catch (error) {
        next(error)
    }
}

//The following controller is for asdviser only
export const getAdviserSchedules = async (req, res, next) => {
    try {
        
        const adviserName = req.user.name
        const schedules = await Schedule.find({adviser: adviserName}).sort({defenseDate: 1})

        if(schedules.length === 0){
            return res.status(404).json({message: "No Schedules assign to you"})
        }

        res.status(200).json(schedules)

    } catch (error) {
        next(error)
    }
}