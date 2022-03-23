import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { FormularioInput } from '../components/FormularioInput';
import usuarioContexto from '../state/state';
import * as EmailValidator from 'email-validator';

import '../styles/registro.css';

export const Registro = () => {
  const { user, setUser } = useContext(usuarioContexto);

  const [dataForm, setDataForm] = useState({
    nombre: '',
    email: '',
    password1: '',
    password2: ''
  });

  const onChange = e => {
    const { name, value } = e.target;
    setDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const registro = e => {
    e.preventDefault();

    const { nombre, email, password1, password2 } = dataForm;

    if (nombre.length < 3) {
      return console.error('el nombre debe tener mas de 3 caracteres');
    }
    if (!EmailValidator.validate(email)) {
      return console.error('Escribe un email valido');
    }
    if (password1.length <= 5) {
      return console.error('La contraseña debe ser mayot a 5 caracteres');
    }

    const isValidPassword = password1 === password2;
    if (!isValidPassword) {
      return console.log('hola');
    }
    //   return console.error('Las contraseñas deben coincidir ');
    // }

    console.log({ nombre, email, password1, password2 });

    fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, password1, password2 })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        setUser({
          nombre: data.usuario.nombre,
          uid: data.usuario._id,
          islogged: true
        });
      });
  };

  return (
    <>
      <div className="container formulario-container">
        <form className="form-control formulario ">
          <FormularioInput
            label="Nombre"
            id="nombre"
            placeholder="Juan Carlos"
            onChange={onChange}
          />
          <FormularioInput
            label="Email"
            id="email"
            placeholder="juan_carlos@mail.com"
            onChange={onChange}
          />
          <FormularioInput
            label="Password"
            id="password1"
            tipo="password"
            onChange={onChange}
            placeholder="Password"
          />
          <FormularioInput
            label="confirma tu password"
            id="password2"
            tipo="password"
            placeholder="Confirmar password"
            onChange={onChange}
          />
          ¿Ya tienes una cuenta? <Link to="/login">logueate aqui</Link>
          <br />
          <button type="submit" className="btn btn-primary" onClick={registro}>
            Registrarse
          </button>
        </form>
        {user.islogged ? <Redirect to="/" /> : <Redirect to="/registro" />}
      </div>
    </>
  );
};
