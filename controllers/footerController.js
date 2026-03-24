import Footer from "../models/Footer.js";

/* ── Helper: get or create the single footer document ── */
const getOrCreateFooter = async () => {
  let footer = await Footer.findOne();
  if (!footer) {
    footer = await Footer.create({ developers: [], contact: {} });
  }
  return footer;
};

/* ── GET footer data ──────────────────────────────────── */
export const getFooter = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    res.status(200).json({
      success: true,
      message: "Footer fetched successfully",
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch footer",
      error: error.message
    });
  }
};

/* ── PUT update developers list ───────────────────────── */
export const updateDevelopers = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    footer.developers = req.body.developers || [];
    await footer.save();
    res.status(200).json({
      success: true,
      message: "Developers updated successfully",
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update developers",
      error: error.message
    });
  }
};

/* ── PUT update contact info ──────────────────────────── */
export const updateContact = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    footer.contact = {
      address: req.body.address || "",
      website: req.body.website || "",
      email:   req.body.email   || "",
      phone:   req.body.phone   || ""
    };
    await footer.save();
    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message
    });
  }
};

/* ── PUT update everything at once ───────────────────── */
export const updateFooter = async (req, res) => {
  try {
    const footer = await getOrCreateFooter();
    if (req.body.developers !== undefined) footer.developers = req.body.developers;
    if (req.body.contact    !== undefined) footer.contact    = req.body.contact;
    await footer.save();
    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update footer",
      error: error.message
    });
  }
};
