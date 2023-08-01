import multer from "multer";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

      cb(null, 'uploads')    // destination path like uploads/files/profiles/

    },
    filename: function (req, file, cb) {

      cb(null,file.originalname)
    //   cb(null, Date.now() + '-' + file.originalname)

    }
  })
  
export const Multer = multer({ storage: storage })







const storageBuffer = multer.memoryStorage()
export const getBuffer= multer({ storage: storageBuffer })