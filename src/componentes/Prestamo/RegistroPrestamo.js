import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import { Image } from 'react-bootstrap';

import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import guardar from './imagenesPrestamo/Guardar.png';

class Prestamo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      datosPrestamo: {},
      idPrestamo: "",
      solicitante: "",
      procedencia: "",
      idEquipo: "",
      fechaDevolucion: "",
      tipoPrestamo: ""
    }
  }

  render(){
    return (
      <section className = "App-section">
        <h1>Registro de Préstamo</h1>
        <hr align="center" noshade="noshade" size="10"  width="90%" />
        <br/>
        <div class="form-row justify-content-center form-container">
          <div class="form-group col-md-5">
            <label>Id Préstamo</label>
            <input
              type="text" class="form-control"
              placeholder="Id del Préstamo"
              value={this.state.idPrestamo}
              onChange={(value)=> this.setState({idPrestamo:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Solicitante</label>
            <input
              type="text" class="form-control"
              placeholder="Nombre del Solicitante"
              value={this.state.solicitante}
              onChange={(value)=> this.setState({solicitante:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Procedencia</label>
            <input
              type="text" class="form-control"
              placeholder="Facultad-Dependencia"
              value={this.state.procedencia}
              onChange={(value)=> this.setState({procedencia:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>ID Equipo</label>
            <input
              type="text" class="form-control"
              placeholder="No. Inventario"
              value={this.state.idEquipo}
              onChange={(value)=> this.setState({idEquipo:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Tipo de préstamo</label>
            <select class="form-control" onChange={(value)=> this.setState({tipoPrestamo:value.target.value})}>
              <option selected>Tipo de Préstamo...</option>
              <option value="Interno">Interno</option>
              <option value="Externo">Externo</option>
            </select>
          </div>

          <div class="form-group col-md-5">
            <label>Fecha de Devolución</label>
            <input type="date" class="form-control"
              placeholder="dd-mm-aaaa"
              value={this.state.fechaDevolucion}
              onChange={(value)=> this.setState({fechaDevolucion:value.target.value})}/>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>this.enviarDatos()}><Image  src= {guardar} /> Guardar</button>
      
      </section>
    );
  }

  enviarDatos() {
    if (this.state.idPrestamo === "") {
      alert("Ingrese el id del Préstamo");
    }
    else if (this.state.solicitante === "") {
      alert("Ingrese el nombre del Solicitante");
    }
    else if (this.state.procedencia === "") {
      alert("Ingrese la procedencia del Solicitante");
    }
    else if (this.state.idEquipo === "") {
      alert("Ingrese el id del Equipo");
    }
    else if (this.state.tipoPrestamo === "") {
      alert("Ingrese el tipo de Préstamo");
    }
    else if (this.state.horaDevolucion === "") {
      alert("Ingrese la hora de la Devolución");
    }
    else {
      //url backend
      const direccionUrl = "http://localhost:3000/prestamo/create";
      const fecha = new Date();
      var fechaPrestamo = fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate();
      var numInventario = this.state.idEquipo;

      //parámetros de datos
      const datosPrestamo = {
        IdPrestamo: this.state.idPrestamo,
        Solicitante: this.state.solicitante,
        Procedencia: this.state.procedencia,
        IdEquipo: this.state.idEquipo,
        FechaPrestamo: fechaPrestamo,
        FechaDevolucion: this.state.fechaDevolucion,
        TipoPrestamo: this.state.tipoPrestamo
      }

      axios.post(direccionUrl, datosPrestamo)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Registro de Préstamo',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.cambiarDisponibilidad(numInventario)
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Registro de Préstamo',
          text: error,
          showConfirmButton: true,
        })
      })

      this.limpiarCampos()
    }
  }

  cambiarDisponibilidad(numInventario) {
    const baseUrl = "http://localhost:3000/equipo/prestamo";

    const dataEquipo = {
      NumInventario: numInventario
    }

    axios.post(baseUrl, dataEquipo)
    .then(response=>{
      if (response.data.success===true) {
        console.log('Equipo Prestado');
      }
      else {
        alert("Error")
      }
    })
    .catch(error=>{
      alert("Error 34 "+error)
    })

  }

  limpiarCampos() {
    this.setState({idPrestamo:""})
    this.setState({solicitante:""})
    this.setState({procedencia:""})
    this.setState({idEquipo:""})
    this.setState({tipoEquipo:""})
    this.setState({fechaPrestamo:""})
    this.setState({horaPrestamo:""})
    this.setState({fechaDevolucion:""})
    this.setState({horaDevolucion:""})
    this.setState({tipoPrestamo:""})

    this.render()
  }
}

export default Prestamo;
