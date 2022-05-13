const { Router } = require('express');
const { check } = require('express-validator');
const { login,googleSignIng } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es oblitatoria').not().isEmpty(),
    ValidarCampos
], login);

router.post('/google',[
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    ValidarCampos
], googleSignIng);

module.exports = router;