import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Image } from 'react-bootstrap';

import RangoPrestamo from './RangoPrestamo';
import FiltroPrestamo from './FiltroPrestamo';

import rango from './imagenesPrestamo/Fecha.png';
import filtro from './imagenesPrestamo/Filtro.png';

function App() {
  return (
    <Router>

      <section className = "App-section">
        <br/>
      	<h1>Control de Préstamos</h1>
        <hr align="center" noshade="noshade" size="10"  width="90%" />


        <div class="btn-group">
          <Link class="btn btn-success btn-lg "  to ="/rangos"><Image  src= {rango} /> Rangos</Link>
          <Link class="btn btn-warning btn-lg"  to ="/filtros"><Image  src= {filtro} /> Filtros</Link>
        </div>

      	<div>
          <Route path="/rangos" exact component = {RangoPrestamo} />
          <Route path="/filtros" exact component = {FiltroPrestamo} />
        </div>
        <br/>
      </section>
    </Router>
  );
}

export default App;
