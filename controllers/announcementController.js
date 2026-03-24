import Announcement from "../models/Announcement.js";

/* Create */
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json({ success: true, message: "Announcement created", data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create", error: error.message });
  }
};

/* Get All + Search + Filter */
export const getAllAnnouncements = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Announcements fetched",
      data: announcements
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch", error: error.message });
  }
};

/* Update */
export const updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Updated successfully", data: updated });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update", error: error.message });
  }
};

/* Delete */
export const deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete", error: error.message });
  }
};

/* Toggle Visibility */
export const toggleVisibility = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    announcement.isVisible = !announcement.isVisible;
    await announcement.save();

    res.json({
      success: true,
      message: "Visibility toggled",
      data: announcement
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to toggle", error: error.message });
  }
};