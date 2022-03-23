import { Router } from 'express';
import { check } from 'express-validator';
import { login, registro } from '../controller/auth';
import { generarJWT } from '../helpers/generarJWT';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.post(
  '/registro',
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
  ],
  registro
);

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
  ],
  login
);

router.get('/renew', validarJWT, async (req, res) => {
  const nombre = req.nombre;
  const uid = req.uid;
  const token = await generarJWT(uid);
  res.json({ token, usuario: { uid, nombre }, ok: true });
});

export default router;
