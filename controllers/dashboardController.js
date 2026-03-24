import Event from "../models/Event.js";
import Team from "../models/Team.js";
import Sponsor from "../models/Sponsor.js";
import Announcement from "../models/Announcement.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalSponsors = await Sponsor.countDocuments();

    // Count total members across all team sections
    const sections = await Team.find();
    let totalMembers = 0;
    sections.forEach(sec => {
      totalMembers += sec.members.length;
    });

    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5);

    // Real announcement counts (was previously hardcoded to 0)
    const totalAnnouncements = await Announcement.countDocuments();
    const recentAnnouncements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        totalSponsors,
        totalMembers,
        totalAnnouncements,
        recentEvents,
        recentAnnouncements
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message
    });
  }
};
