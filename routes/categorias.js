
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizaCategoria,
        categoriaDelete} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

//Obtiene los middlewares desde el archivo index en la carpeta misma
const {
  ValidarCampos,
  validarJWT,
  esAdminRole,
  tieneRole
} = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/categorias
 * 
 */

//Obtener todas las categorias - publico
router.get('/',obtenerCategorias);

//OBtener una categoria por id - publico
router.get('/:id',[
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    ValidarCampos
], obtenerCategoria);

//Crear categoria - privado - calquier persona puede con un token validon
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    ValidarCampos
],
crearCategoria);

// Actualizar - privado - con token valido
router.put('/:id',[
    validarJWT,
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    ValidarCampos
], actualizaCategoria);


// Borrar categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    ValidarCampos
] ,categoriaDelete);



module.exports = router;