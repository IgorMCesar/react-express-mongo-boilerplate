import { Usuario } from '../models/usuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT';

export const registro = async (req, res) => {
  const { nombre, email, password1, password2 } = req.body;

  const userInDb = await Usuario.findOne({ email });

  if (userInDb) {
    return res.status(401).json({
      msg: `Ya existe un usuario con el email ${email}`
    });
  }

  if (password1.length <= 5) {
    return res.status(401).json({
      msg: 'El password debe ser de al menos 6 caracteres'
    });
  }

  if (password1 !== password2) {
    return res.status(401).json({
      msg: 'el password no coincide'
    });
  }
  // encriptanto contraseña
  const salt = bcryptjs.genSaltSync();

  const usuario = new Usuario({
    nombre,
    email,
    password: bcryptjs.hashSync(password1, salt)
  });

  await usuario.save();
  const token = await generarJWT(usuario._id);
  return res.json({ usuario, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(401).json({
      msg: 'Email o password no son correctos'
    });
  }

  const validPassword = bcryptjs.compareSync(password, usuario.password);

  if (!validPassword) {
    return res.status(401).json({
      msg: 'Email o password no son correctos'
    });
  }
  const token = await generarJWT(usuario._id);

  res.json({ usuario, token });
};
