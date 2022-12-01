const multer = require("multer");
const errorHandler = require("../helpers/errorHandler");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = "./uploads";
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".");
    const ext = extension[extension.length - 1];
    const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
});

const uploadMiddleware = upload.single("picture");

module.exports = (req, res, next) => {

  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.log("error disini");
      return errorHandler(err, res);
    }
    next();
  });
};
