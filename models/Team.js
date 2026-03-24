import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  image: { type: String },
  phone: { type: String },
  instagram: { type: String }
});

const teamSchema = new mongoose.Schema(
  {
    sectionName: { type: String, required: true, trim: true },
    members: [memberSchema]
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;