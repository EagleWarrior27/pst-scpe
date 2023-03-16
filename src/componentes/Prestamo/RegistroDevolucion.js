import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import { Image } from 'react-bootstrap';
import buscar from './imagenesPrestamo/Buscar.png';
import guardar from './imagenesPrestamo/Guardar.png';

class Devolucion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      idPrestamo: "",
      solicitante: "",
      idEquipo: "",
      tipoEquipo:"",
      fechaDevolucion: "",
      horaDevolucion: ""
    }
  }

  render(){
    return (
      <section className = "App-section">
        <h1>Registro de Devolución</h1>
        <hr align="center" noshade="noshade" size="10"  width="90%" />
        <div class="form-group col-md-3">
          <label>Id Préstamo</label>
          <input type="text" class="form-control"
            placeholder="Id del prestamo" value={this.state.idPrestamo}
            onChange={(value)=> this.setState({idPrestamo:value.target.value})}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>this.findPrestamo()}><Image  src= {buscar} /> Buscar</button>
        
        <div className='form-row justify-content-center form-container'>
          <div class="form-group col-md-5">
            <label>Solicitante</label>
            <input type="text" class="form-control"
              placeholder="Solicitante" value={this.state.solicitante}
              onChange={(value)=> this.setState({solicitante:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Id Equipo</label>
            <input type="text" class="form-control"
              placeholder="Id Préstamo" value={this.state.idEquipo}
              onChange={(value)=> this.setState({idEquipo:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Tipo de Equipo</label>
            <input type="text" class="form-control"
              placeholder="Tipo de Equipo" value={this.state.tipoEquipo}
              onChange={(value)=> this.setState({tipoEquipo:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Fecha Devolucion</label>
            <input type="date" class="form-control"
              placeholder="dd-mm-aaaa"
              value={this.state.fechaDevolucion}
              onChange={(value)=> this.setState({fechaDevolucion:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label>Hora Devolucion</label>
            <input type="time" class="form-control"
              placeholder="hh:mm"
              value={this.state.horaDevolucion}
              onChange={(value)=> this.setState({horaDevolucion:value.target.value})}
            />
          </div>
        </div>

        <div class="btn-group">
          <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}><Image  src= {guardar} /> Guardar</button>
        </div>
        <br/>
      </section>
    );
  }

  findPrestamo(){
    if(this.state.idPrestamo === ""){
      Swal.fire({
          icon: 'error',
          title: 'Registro de Devolución',
          text: 'Ingrese el No. de Inventario',
          showConfirmButton: true,
      })
    }else{
      let prestamoId = this.state.idPrestamo;
      const url = "http://localhost:3000/prestamo/get/"+ prestamoId;

      axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0]

          if(data === undefined){
            Swal.fire({
              icon: 'error',
              title: 'Registro de Devolución',
              text: 'Préstamo inexistente',
              showConfirmButton: true,
            })
          }else {
            Swal.fire({
              icon: 'success',
              title: 'Registro de Devolución',
              text: 'Obteniendo los datos...',
              showConfirmButton: false,
              timer: 1500
            })
            this.setState({
              dataPrestamo:data,
              solicitante: data.SOLICITANTE,
              idEquipo: data.ID_EQUIPO,
              tipoEquipo: data.EQUIPO,
              fechaDevolucion: data.FECHA_DEVOLUCION,
              horaDevolucion: data.HORA_DEVOLUCION
            })
          }
        }else {
          alert("Error web service")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
  }

  sendSave() {
    if (this.state.idPrestamo === "") {
      alert("Ingrese el ID del Usuario");
    }
    else if (this.state.idEquipo === "") {
      alert("Ingrese el nombre del Usuario");
    }
    else if(this.state.tipoEquipo === ""){
      alert("Ingrese el nombre del Tipo de Equipo");
    }
    else if (this.state.fechaDevolucion === "") {
      alert("Ingrese el nombre del Usuario");
    }
    else if (this.state.horaDevolucion === "") {
      alert("Ingrese el apellido paterno del Usuario");
    }else{
      ///  get parameter id
    let equipmentNum = this.state.idPrestamo;
    // url de backend
    const baseUrl = "http://localhost:3000/prestamo/update/"+equipmentNum;

        var numInventario = this.state.idEquipo;
    // parametros de datos post
    const datapost = {
      IdPrestamo: this.state.idPrestamo,
      IdEquipo: this.state.idEquipo,
      TipoEquipo: this.state.tipoEquipo,
      FechaDevolucion: this.state.fechaDevolucion,
      HoraDevolucion: this.state.horaDevolucion
    }

    axios.post(baseUrl,datapost)
    .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Registro de Devolución',
          text: 'Devolución completada',
          showConfirmButton: false,
          timer: 1500
        })

        this.cambiarDisponibilidad(numInventario)
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Registro de Devolución',
          text: error,
          showConfirmButton: true,
        })
      })

      this.limpiarCampos()
    }
  }

  cambiarDisponibilidad(numInventario) {
    const baseUrl = "http://localhost:3000/equipo/devolucion";

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
    this.setState({idEquipo:""})
    this.setState({tipoEquipo:""})
    this.setState({fechaDevolucion:""})
    this.setState({horaDevolucion:""})

    this.render()
  }
}

export default Devolucion;
