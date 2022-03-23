import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import usuarioContexto from '../state/state';

export const Home = () => {
  const { user, setUser } = useContext(usuarioContexto);

  const logout = () => {
    setUser({ nombre: '', uid: '', islogged: false });
    localStorage.clear('token');
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-4">App test </h1>
        <div className="d-flex justify-content-between d-print-inline-block align-middle mt-5">
          <h4 className="text-center">
            Bienvenido: <span className="text-primary"> {user.nombre} </span>
          </h4>

          <button onClick={logout} className="logout btn btn-danger">
            Logout
          </button>
        </div>

        <img
          src="https://i.pinimg.com/564x/8e/f7/26/8ef726cc8bae5adcedbb0b6cd1a873fe.jpg"
          alt="emoji"
        />
        <br />
      </div>

      {!user.islogged ? <Redirect to="/login" /> : <Redirect to="/" />}
    </>
  );
};
