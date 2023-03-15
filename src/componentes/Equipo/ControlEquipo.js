import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Image } from 'react-bootstrap';

import ListaEquipo from './ListaEquipo';
import EdicionEquipo from './EdicionEquipo';
import EquipoDisponible from './EquipoDisponible';
import EquipoEnPrestamo from './EquipoEnPrestamo';

import tabla from './imagenesEquipo/Tabla.png';
import palomita from './imagenesEquipo/Palomita.png';
import tachita from './imagenesEquipo/Tachita.png';


function App() {
  return (
    <Router>
      <section className = "App-section">
      	<h1>Control de Equipos</h1>
        <hr align="center" noshade="noshade" border="15px"  width="90%" />
        <br/>
        <div class="btn-group">
          <Link class="btn btn-primary btn-lg "  to ="/list">
            <Image  src= {tabla} /> Ver Equipos
          </Link>
          <Link class="btn btn-success btn-lg "  to ="/disponible">
            <Image  src= {palomita} /> Disponibles
          </Link>
          <Link class="btn btn-danger btn-lg "  to ="/prestado">
            <Image  src= {tachita} /> En Préstamo
          </Link>

        </div>
        <br/>
      	<div>
          <Route path="/list" exact component = {ListaEquipo} />
          <Route path="/edit/:id" component = {EdicionEquipo} />
          <Route path="/disponible" exact component = {EquipoDisponible} />
          <Route path="/prestado" exact component = {EquipoEnPrestamo} />
        </div>
        <br/>
      </section>
    </Router>
  );
}

export default App;
