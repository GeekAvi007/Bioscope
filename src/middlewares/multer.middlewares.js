import multer from "multer";
import path from "path"; // Import path module to avoid path issues

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./public/temp")); // Use absolute path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); 
  }
});

export const upload = multer({ storage });
