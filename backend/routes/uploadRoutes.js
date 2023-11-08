import path from "path";
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/images");
    //the folder,uploads, where file will go; static files will be stored in this folder.
  },
  // filename(req, file, cb) {
  //   const ext = MIME_TYPE_MAP[file.mimetype];
  //   cb(null, uuidv4() + "." + ext);
  // },
  filename(req, file, cb) {
    const ext = MIME_TYPE_MAP[file.mimetype];
    if (ext !== undefined) {
      cb(null, uuidv4() + "." + ext);
    } else {
      cb(null, false);
    }
  },
});

function fileFilter(req, file, cb) {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only image is allowed!"));
    // cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("image"), (req, res) => {
  // console.log(req.file.path);   //frontend\public\images\8e1261be-5ada-43d7-b939-4d807897cd33.jpeg

  //here 'image' is the fieldname that used in storage's filename.
  const splittedPath = req.file.path.split("\\");
  // const editedImagePath = splittedPath
  //   .slice(splittedPath.indexOf("images"))
  //   .join("/");

  // "images/98f51eb1-565c-4737-a551-0c1c915dd159.jpeg"

  // OR,
  // We need last two element because file is inside of the images directory.
  const editedImagePath = `${
    "/" +
    splittedPath[splittedPath.length - 2] +
    "/" +
    splittedPath[splittedPath.length - 1]
  }`;

  console.log(editedImagePath); // "/images/98f51eb1-565c-4737-a551-0c1c915dd159.jpeg"
  res.send({
    message: "Image uploaded",
    // image: req.file.path,
    image: editedImagePath,
  });
});

export default router;
