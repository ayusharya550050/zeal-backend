import Sponsor from "../models/Sponsor.js";

/* -----------------------------
   Create Category
------------------------------ */
export const createCategory = async (req, res) => {
  try {
    const category = await Sponsor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Sponsor category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

/* -----------------------------
   Get All Sponsors
------------------------------ */
export const getAllSponsors = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    let categories = await Sponsor.find();

    // Filter by category
    if (category) {
      categories = categories.filter(c => c.category === category);
    }

    // Filter sponsors by keyword
    if (keyword) {
      categories = categories.map(c => ({
        ...c._doc,
        sponsors: c.sponsors.filter(s =>
          s.name.toLowerCase().includes(keyword.toLowerCase())
        )
      }));
    }

    res.status(200).json({
      success: true,
      message: "Sponsors fetched successfully",
      data: categories
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sponsors",
      error: error.message
    });
  }
};

/* -----------------------------
   Delete Category
------------------------------ */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Sponsor.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

/* -----------------------------
   Add Sponsor to Category
------------------------------ */
export const addSponsor = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Sponsor.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const sponsorData = { name };

    if (req.file) sponsorData.logo = `/uploads/${req.file.filename}`;

    category.sponsors.push(sponsorData);
    await category.save();

    res.status(200).json({
      success: true,
      message: "Sponsor added successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add sponsor",
      error: error.message,
    });
  }
};

/* -----------------------------
   Update Sponsor
------------------------------ */
export const updateSponsor = async (req, res) => {
  try {
    const { categoryId, sponsorId } = req.params;

    const category = await Sponsor.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const sponsor = category.sponsors.id(sponsorId);

    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    sponsor.name = req.body.name || sponsor.name;

    if (req.file) sponsor.logo = `/uploads/${req.file.filename}`;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Sponsor updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update sponsor",
      error: error.message,
    });
  }
};

/* -----------------------------
   Delete Sponsor
------------------------------ */
export const deleteSponsor = async (req, res) => {
  try {
    const { categoryId, sponsorId } = req.params;

    const category = await Sponsor.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const sponsor = category.sponsors.id(sponsorId);

    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    sponsor.deleteOne();
    await category.save();

    res.status(200).json({
      success: true,
      message: "Sponsor deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete sponsor",
      error: error.message,
    });
  }
};