import Home from "../models/Home.js";

/* Helper: ensure single doc */
const getOrCreateHome = async () => {
  let home = await Home.findOne();

  if (!home) {
    home = await Home.create({
      aboutFestival: "",
      stats: [],
      highlights: [],
      gallery: [],
      artistsTimeline: [],
      faq: []
    });
  }

  return home;
};

export const getHomeData = async (req, res) => {
  try {
    const home = await getOrCreateHome();

    res.json({
      success: true,
      message: "Home fetched",
      data: home
    });

  } catch (e) {
    console.error("Home fetch error:", e.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch home data",
      error: e.message
    });
  }
};

export const updateAboutFestival = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    home.aboutFestival = req.body.aboutFestival;
    await home.save();
    res.json({ success: true, message: "About updated", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update about", error: e.message });
  }
};

export const updateStats = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    home.stats = req.body.stats || [];
    await home.save();
    res.json({ success: true, message: "Stats updated", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update stats", error: e.message });
  }
};

export const updateHighlights = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    home.highlights = req.body.highlights || [];
    await home.save();
    res.json({ success: true, message: "Highlights updated", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update highlights", error: e.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }
    const home = await getOrCreateHome();
    const imagePath = `/uploads/${req.file.filename}`;
    home.gallery.push({ image: imagePath });
    await home.save();
    res.json({ success: true, message: "Image added", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to add image", error: e.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= home.gallery.length) {
      return res.status(400).json({ success: false, message: "Invalid gallery index" });
    }
    home.gallery.splice(index, 1);
    await home.save();
    res.json({ success: true, message: "Image deleted", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete image", error: e.message });
  }
};

export const updateArtists = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    home.artistsTimeline = req.body.artistsTimeline || [];
    await home.save();
    res.json({ success: true, message: "Artists updated", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update artists", error: e.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const home = await getOrCreateHome();
    home.faq = req.body.faq || [];
    await home.save();
    res.json({ success: true, message: "FAQ updated", data: home });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to update FAQ", error: e.message });
  }
};
