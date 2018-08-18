const multer  = require('multer')
const mkdirp  = require('mkdirp');

const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDay();
        let dir = `./public/uploads/images/${year}/${month}/${day}`;

        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        cb(null, Date.now() +  '-' + file.originalname ) 
    }
});

const imageFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        console.log('R T');
        cb(null , true)
    } else {
        console.log('R F');
        cb(null , false)
    }
}

const uploadImage = multer({ 
    storage : ImageStorage,
    limits : {
        fileSize : 1024 * 1024 * 100
    },
    fileFilter : imageFilter
})


module.exports = {
    
    uploadImage
}