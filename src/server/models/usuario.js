import { Schema, model } from 'mongoose';

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'el nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'el correo es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria']
  }
});

export const Usuario = model('Usuario', usuarioSchema);
