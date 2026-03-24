import multer from "multer";
import path from "path";

/* Storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

/* File Filter — accept jpeg, jpg, png, webp */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext  = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = /image\/(jpeg|jpg|png|webp)/.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpg, jpeg, png, webp) are allowed"));
  }
};

/* Upload Middleware */
const upload = multer({ storage, fileFilter });

export default upload;
