// Config/MulterConfig.js
//const multer=require('multer');
//const path=require('path')

//const storage = multer.memoryStorage(); // keep files in memory


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'products/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

const multer = require("multer");

const storage = multer.memoryStorage(); // use memory, not disk


const upload = multer({ storage });

module.exports=upload;
