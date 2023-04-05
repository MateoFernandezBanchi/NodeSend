const multer = require('multer');
const shortid = require('shortid');


exports.subirArchivo = async (req, res) => {
    
    const configuracionMulter = {
        limits : { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads');
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        }),
    }
    const upload = multer(configuracionMulter).single('archivo');

    upload( req, res, async(error) => {
        console.log(req.file);
        if (!error) {
            res.json({ archivo: req.file.filename});
        } else {
            console.log(error)
        }
    } )
}

exports.eliminarArchivo = async (req, res) => {
    try {
        res.json({archivo: req.file.filename});
    } catch (error) {
        console.log(error);
    }
}