import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Registro, Home } from './pages/';
import usuarioContexto from './state/state';

export default function App() {
  const [user, setUser] = useState({ nombre: '', uid: '', islogged: false });

  useEffect(() => {
    // aqui pasan cosas  muy raras piter
    const token = localStorage.getItem('token') || null;
    const existToken = Boolean(token);

    if (existToken) {
      fetch('http://localhost:3000/api/renew', {
        headers: {
          token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setUser(p => ({
              ...p,
              nombre: data.usuario.nombre,
              uid: data.usuario.uid,
              islogged: true
            }));
          }
        });
    }
  }, []);

  return (
    <usuarioContexto.Provider value={{ user, setUser }}>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registro">
              <Registro />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </usuarioContexto.Provider>
  );
}
