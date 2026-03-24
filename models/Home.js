import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  value: String,
  label: String
});

const highlightSchema = new mongoose.Schema({
  title: String,
  description: String
});

const gallerySchema = new mongoose.Schema({
  image: String
});

const artistSchema = new mongoose.Schema({
  year: String,
  name: String,
  genre: String
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const homeSchema = new mongoose.Schema(
  {
    aboutFestival: String,
    stats: [statSchema],
    highlights: [highlightSchema],
    gallery: [gallerySchema],
    artistsTimeline: [artistSchema],
    faq: [faqSchema]
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;