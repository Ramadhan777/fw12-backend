const multer = require("multer");
const errorHandler = require("../helpers/errorHandler");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = "./uploads/movie";
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".");
    const ext = extension[extension.length - 1];
    const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed"))
  }
};

const maxSize = 1 * 1024 * 1024

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize}
});

const uploadMovieMiddleware = upload.single("picture");

module.exports = (req, res, next) => {
  uploadMovieMiddleware(req, res, (err) => {
    if (err) {
      return errorHandler(err, res);
    }
    next();
  });
};
