
const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste,ExisteUsuarioPorId } = require('../helpers/db-validators')

const { ValidarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosDelete,
        usuariosPatch,
        usuariosPost } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(ExisteUsuarioPorId),
  check('rol').custom(esRoleValido),
  ValidarCampos
],usuariosPut);

router.post('/', [
  check('correo','El correo no es válido').isEmail(),
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y más de 6 letras').isLength({min:6}),
  //check('rol','No es un rol Válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('correo').custom(emailExiste),
  check('rol').custom(esRoleValido),
  ValidarCampos
],usuariosPost );

router.delete('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(ExisteUsuarioPorId),
  ValidarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;