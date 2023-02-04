const multer = require("multer");
const errorHandler = require("../helpers/errorHandler");
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dirPath = "./uploads";
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath);
//     }
//     cb(null, dirPath);
//   },
//   filename: (req, file, cb) => {
//     const extension = file.originalname.split(".");
//     const ext = extension[extension.length - 1];
//     const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
//     cb(null, name);
//   },
// });

cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Tiku_Picture',
    format: async (req, file) => 'png',
    public_id: (req, file) => {
      const randomNumber = Math.round(Math.random() * 90000)
      const fileName = `${randomNumber}${Date.now()}`
      return fileName
    }
  }
})

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

const uploadMiddleware = upload.single("picture");

module.exports = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      console.log(process.env.CLOUD_NAME)
      console.log(process.env.API_KEY)
      console.log(process.env.API_SECRET)
      return errorHandler(err, res);
    }
    next();
  });
};
