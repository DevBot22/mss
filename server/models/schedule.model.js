import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  manuscriptTitle: {
    type: String,
    required: true,
  },
  adviser: {
    type: String,
    required: true,
  },
  panelMembers: {
    type: [String],
    required: true,
  },
  defenseDate: {
    type: Date,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);
