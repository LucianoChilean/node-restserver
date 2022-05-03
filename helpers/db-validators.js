
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`el rol ${rol} no está registrado en la BD`);
    }
  }


  //Verificar si el correo existe
  const emailExiste =  async(correo = '')=> {
   const existeEmail =  await Usuario.findOne({correo});
  if(existeEmail){
      throw new Error(`el Correo: ${correo} ya esta registrado`);
  }

  }

  //Existe Usuario por id
  const ExisteUsuarioPorId =  async(id)=> {
    const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
      throw new Error(`el Id: ${id} no existe`);
  }

  }

  //Validar que clave es igual
  
  

  module.exports = {
      esRoleValido,
      emailExiste,
      ExisteUsuarioPorId
  }