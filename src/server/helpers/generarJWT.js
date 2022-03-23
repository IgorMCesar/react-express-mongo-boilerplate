import jwt from 'jsonwebtoken';

export const generarJWT = uid => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_WORD,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};
