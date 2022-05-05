const bcryptjs = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario')

const login = async(req, res = response) => {

    const {correo,password} = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - correo'
            });
        }
        //Verificar la contraseña
        const validPassword = await bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - password'
            });
        }
        //Si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario Inactivo'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
           usuario,
           token
        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

       
}

module.exports = {login};
