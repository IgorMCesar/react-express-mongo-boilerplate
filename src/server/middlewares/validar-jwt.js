import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario';

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.headers['token'];

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_WORD);
    const usuario = await Usuario.findOne({ _id: uid });
    if (!usuario) {
      return res.status(401).json({
        msg: 'No se puedo generar el jwt',
        ok: false
      });
    }

    req.uid = usuario._id;
    req.nombre = usuario.nombre;

    next();
  } catch (error) {
    res.status(401).json({
      msg: 'No se puedo generar el jwt',
      ok: false
    });
  }
};
