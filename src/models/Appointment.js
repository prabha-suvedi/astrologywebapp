import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
});

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
