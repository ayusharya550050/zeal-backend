import mongoose from "mongoose";

/* -----------------------------
   Sponsor Item Schema
------------------------------ */
const sponsorItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String, // URL or file path
  },
});

/* -----------------------------
   Sponsor Category Schema
------------------------------ */
const sponsorSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    sponsors: [sponsorItemSchema],
  },
  {
    timestamps: true,
  }
);

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;