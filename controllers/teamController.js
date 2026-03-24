import Team from "../models/Team.js";

/* Create Section */
export const createSection = async (req, res) => {
  try {
    const section = await Team.create(req.body);
    res.status(201).json({ success: true, message: "Section created", data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create section", error: error.message });
  }
};

/* Get All Sections */
export const getAllSections = async (req, res) => {
  try {
    const { keyword } = req.query;

    let sections = await Team.find();

    if (keyword) {
      sections = sections.map(section => ({
        ...section._doc,
        members: section.members.filter(m =>
          m.name.toLowerCase().includes(keyword.toLowerCase())
        )
      }));
    }

    res.status(200).json({
      success: true,
      message: "Sections fetched",
      data: sections
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sections",
      error: error.message
    });
  }
};

/* Delete Section */
export const deleteSection = async (req, res) => {
  try {
    const section = await Team.findByIdAndDelete(req.params.sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Section deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete section",
      error: error.message
    });
  }
};

/* Add Member */
export const addMember = async (req, res) => {
  try {
    const section = await Team.findById(req.params.sectionId);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });

    const memberData = {
      name: req.body.name,
      designation: req.body.designation,
      phone: req.body.phone,
      instagram: req.body.instagram
    };

    if (req.file) memberData.image = `/uploads/${req.file.filename}`;

    section.members.push(memberData);
    await section.save();

    res.status(200).json({ success: true, message: "Member added", data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add member", error: error.message });
  }
};

/* Update Member */
export const updateMember = async (req, res) => {
  try {
    const { sectionId, memberId } = req.params;

    const section = await Team.findById(sectionId);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });

    const member = section.members.id(memberId);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    member.name = req.body.name || member.name;
    member.designation = req.body.designation || member.designation;
    member.phone = req.body.phone || member.phone;
    member.instagram = req.body.instagram || member.instagram;

    if (req.file) member.image = `/uploads/${req.file.filename}`;

    await section.save();

    res.status(200).json({ success: true, message: "Member updated", data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update member", error: error.message });
  }
};

/* Delete Member */
export const deleteMember = async (req, res) => {
  try {
    const { sectionId, memberId } = req.params;

    const section = await Team.findById(sectionId);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });

    const member = section.members.id(memberId);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });

    member.deleteOne();
    await section.save();

    res.status(200).json({ success: true, message: "Member deleted", data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete member", error: error.message });
  }
};