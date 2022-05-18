
const { Categoria,Role,Usuario,Producto } = require('../models');

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

  /*--
   Validar id categorias
  */

   const existeCategoriaPorId = async(id)=> {

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
      throw new Error(`El id no existe ${id}`)
    }

   }

   /*
   * Validar id Productos 
   */
   const existeProductoPorId = async(id)=> {

    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
      throw new Error(`El id no existe ${id}`)
    }

    
   }

   /*
   * Validar las coleccionas permitidas
   */

   const coleccionesPermitidas = (coleccion= '',colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);

    if(!incluida){
      throw new Error(`La colección${coleccion} no es permitida, ${colecciones}`)
    }

      return true;
   } 
  
  

  module.exports = {
      esRoleValido,
      emailExiste,
      ExisteUsuarioPorId,
      existeCategoriaPorId,
      existeProductoPorId,
      coleccionesPermitidas
  }