const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
    // Revisar si hay errrores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    // Almacenar en la BD
    const { nombre_original } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;

    
    // Si el usuario esta autenticado
    if (req.usuario) {
        const { password, descargas } = req.body;
        // Asignar a enlace el numero de descargas
        if (descargas) {
            enlace.descargas = descargas;
        }
        // Asignar un password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash( password, salt );
        }
        // Asignar el autor
        enlace.autor = req.usuario.id;
    }

    try {
        await enlace.save();
        res.json({msg: `${enlace.url}`});
        return next();
    } catch (error) {
        console.log(error);
    }
}

// Obtener el enlace

exports.obtenerEnlace = async (req, res, next) => {
    console.log(req.params.url);
    const { url } = req.params;
    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url })
    if (!enlace) {
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next();
    };
    res.json({archivo: enlace.nombre})
    // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
    const { descargas, nombre } = enlace;
    if (descargas === 1) {
        // Eliminar el archivo
        req.archivo = nombre;
        // Eliminar la entrada de la BD
        await Enlaces.findOneAndRemove(req.params.url);
        next();
    }
    else {
        // Si las descargas son > a 1 - Restar 1
        enlace.descargas--;
        await enlace.save();
    }
}