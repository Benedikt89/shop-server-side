import multer from "multer";

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        let type = req.params.type;
        let path = `../static/images/${type}`;
        cb(null, `static/images`);
    },
    filename: function (req:any, file:any, cb:any) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype === 'image/png'|| file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
//    fileFilter: fileFilter
});