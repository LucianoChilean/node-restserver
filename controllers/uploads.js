                                                               
const fs   = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const {response} = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario,Producto} = require('../models');


const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files,undefined,'imgs');
        res.json({ nombre }); 
    } catch (msg) {
        res.status(400).json({msg});
    }
  
}

const actualizarImagen = async(req,res = response) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Falta validar esto'
            });
    }

    
    // Limpiar imagenes previas 
    if(modelo.imagen){
        //Hay que borrar la imgen del servidor
        const pathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.imagen);
        
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.imagen = nombre;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async(req,res = response) => {

 
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Falta validar esto'
            });
    }

    
    // Limpiar imagenes previas 
    if(modelo.imagen){
        //Hay que borrar la imgen del servidor
        const pathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.imagen);
        
        if(fs.existsSync(pathImagen)){
           return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg');

    res.sendFile(pathImagen);

}

const actualizarImagenClaudinary = async(req,res = response) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Falta validar esto'
            });
    }

    
    // Limpiar imagenes previas 
    if(modelo.imagen){
       const nombreArr = modelo.imagen.split('/');
       const nombre = nombreArr[nombreArr.length -1];
       const [public_id] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
    }

   const {tempFilePath} = req.files.archivo;
   const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    modelo.imagen = secure_url;

    await modelo.save();

     res.json(modelo);

}


const mostrarImagenCloudinary = async(req,res = response) => {

    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Falta validar esto'
            });
    }

    
    // Limpiar imagenes previas 
    if(modelo.imagen){
      
        //Hay que borrar la imgen del servidor
           return res.json(modelo.imagen);
        
    }

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenClaudinary,
    mostrarImagenCloudinary
};