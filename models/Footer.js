import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
  name:   { type: String, trim: true },
  role:   { type: String, trim: true },
  github: { type: String, trim: true }
});

const contactSchema = new mongoose.Schema({
  address: { type: String, trim: true },
  website: { type: String, trim: true },
  email:   { type: String, trim: true },
  phone:   { type: String, trim: true }
});

const footerSchema = new mongoose.Schema(
  {
    developers: [developerSchema],
    contact:    { type: contactSchema, default: {} }
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;
