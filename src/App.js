import React from 'react';
import './estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import Principal from "./componentes/Principal";
import Prestamo from "./componentes/Prestamo/RegistroPrestamo";
import Devolucion from "./componentes/Prestamo/RegistroDevolucion";
import Equipo from "./componentes/Equipo/RegistroEquipo";
import ControlEquipo from "./componentes/Equipo/ControlEquipo";
import ControlPrestamo from "./componentes/Prestamo/ControlPrestamo";

export default function App() {
  return (
    <Router>
      <Navbar className="App-nav" expand="lg">
        <Container>
          <Navbar.Brand href="/">SCPE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/prestamo">Préstamo</Nav.Link>

              <Nav.Link href="/devolucion">Devolución</Nav.Link>

              <Nav.Link href="/registroEquipo">Equipo</Nav.Link>

              <NavDropdown title="Control" id="basic-nav-dropdown">
                <NavDropdown.Item href="/controlEquipos">Equipos</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/controlPrestamos">Préstamos</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <article className = "App-article">
        <Route exact path = "/" component = {Principal}/>
        <Route path = "/prestamo" component = {Prestamo}/>
        <Route path = "/devolucion" component = {Devolucion}/>
        <Route path = "/registroEquipo" component = {Equipo}/>
        <Route path = "/controlEquipos" component = {ControlEquipo}/>
        <Route path = "/controlPrestamos" component = {ControlPrestamo}/>
      </article>

      <footer className = "App-footer">
        <small>Copyright© 2019 - CodersPST</small>
      </footer>
    </Router>
  );
}
