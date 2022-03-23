import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { FormularioInput } from '../components/FormularioInput';
// import { EmailValidation, validarEm]ail } from '../helpers/validarCorreo';
import usuarioContexto from '../state/state';
import '../styles/registro.css';
import * as EmailValidator from 'email-validator';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { user, setUser } = useContext(usuarioContexto);

  const onChance = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const login = e => {
    e.preventDefault();
    const { email, password } = formData;

    console.log(EmailValidator.validate(email));

    if (!EmailValidator.validate(email)) {
      return console.error('el correo no es valido');
    }
    if (password.length <= 5) {
      return console.error('La contraseña debe ser de almenos 6 caracteres');
    }

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        console.log(data.usuario.nombre, data.token);
        setUser(prev => ({
          ...prev,
          nombre: data.usuario.nombre,
          uid: data.usuario.uid,
          token: data.token,
          islogged: true
        }));
      })
      .catch(console.log);
    console.log(formData);
  };

  return (
    <>
      <div className="container formulario-container">
        <form className="form-control formulario ">
          <FormularioInput label="Email" id="email" onChange={onChance} />
          <FormularioInput label="Password" id="password" tipo="password" onChange={onChance} />
          ¿No tienes cuenta? <Link to="/registro"> registrate aqui</Link>
          <br />
          <button type="submit" className="btn btn-primary" onClick={login}>
            Login
          </button>
        </form>
      </div>

      {user.islogged ? <Redirect to="/" /> : <Redirect to="/login" />}
    </>
  );
};
