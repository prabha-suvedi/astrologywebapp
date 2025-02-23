import mongoose from "mongoose";

const ZodiacSchema = new mongoose.Schema({
  sign: { type: String, required: true, unique: true },
  prediction: { type: String, required: true },
}, { timestamps: true });

const Zodiac = mongoose.models.Zodiac || mongoose.model("Zodiac", ZodiacSchema);

export default Zodiac;
