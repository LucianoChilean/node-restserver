const bcryptjs = require("bcryptjs/dist/bcrypt");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');
const { googleverify } = require('../helpers/google-verify');
const { json } = require("express/lib/response");

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

const googleSignIng = async(req, res = response) => {

    const {id_token} = req.body;

    try {

        const {nombre,imagen,correo} = await googleverify(id_token);

       // console.log(nombre,img,correo);
        //buscar usuario por mail
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            console.log("no existe usuario")
            //si no existe usuario hay que crearlo
            const data = {
                nombre,
                correo,
                password : ':P',
                google: true,
                rol:'USER_ROLE',
                imagen
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        // Si el usuario en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }


        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
   // googleverify
  

}

module.exports = {
    login,
    googleSignIng
};
