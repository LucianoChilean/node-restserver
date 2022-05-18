
const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizaProducto,
        productoDelete } = require('../controllers/productos');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

const {
    ValidarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
  } = require('../middlewares');


  
  const router = Router();

  /**
 * {{url}}/api/productos
 * 
 */

//Obtener todas las categorias - publico
router.get('/',[
    validarJWT
],obtenerProductos);

//OBtener una categoria por id - publico
router.get('/:id',[
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
],obtenerProducto );

//Crear categoria - privado - calquier persona puede con un token validon
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','no es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    ValidarCampos
],
crearProducto);

// Actualizar - privado - con token valido
router.put('/:id',[
    validarJWT,
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
],actualizaProducto);


// Borrar categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    ValidarCampos
],productoDelete );


  module.exports = router;