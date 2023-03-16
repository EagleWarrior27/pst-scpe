import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import guardar from './imagenesEquipo/Guardar.png';

class Equipo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numInventario: "",
      tipo: "",
      marca: "",
      modelo: "",
      numSerie: "",
      disponibilidad: ""
    }
  }

  render(){
    return (
      <section className="App-section">
        <h1>Registro de Equipo</h1>
        <hr align="center" noshade="noshade" size="10"  width="90%" />

        <div class="form-row justify-content-center form-container">
          <div class="form-group col-md-5">
            <label for="inputPassword4">ID Equipo</label>
            <input type="text" class="form-control"
              placeholder="Número de Inventario"
              value={this.state.numInventario}
              onChange={(value)=> this.setState({numInventario:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label for="inputEmail4">Tipo</label>
            <select class="form-control" onChange={(value)=> this.setState({tipo:value.target.value})}>
              <option selected>Tipo de Equipo...</option>
              <option value="Laptop">Laptop</option>
              <option value="Video Proyector">Video Proyector</option>
              <option value="Extensión">Extensión</option>
              <option value="Regulador">Regulador</option>
              <option value="Bocinas">Bocinas</option>
              <option value="Tarjeta Inalámbrica">Tarjeta Inalámbrica</option>
              <option value="Impresora">Impresora</option>
            </select>
          </div>

          <div class="form-group col-md-5">
            <label for="inputEmail4">Marca</label>
            <input type="text" class="form-control"
              placeholder="Marca" value={this.state.marca}
              onChange={(value)=> this.setState({marca:value.target.value})}
            />
          </div>

          <div class="form-group col-md-5">
            <label for="inputEmail4">Modelo</label>
            <input type="text" class="form-control"
              placeholder="Modelo"
              value={this.state.modelo}
              onChange={(value)=> this.setState({modelo:value.target.value})}/>
          </div>


          <div class="form-group col-md-5">
            <label for="inputEmail4">Número de Serie</label>
            <input type="text" class="form-control"
              placeholder="Serie"
              value={this.state.numSerie}
              onChange={(value)=> this.setState({numSerie:value.target.value})}
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}><Image  src= {guardar} /> Guardar</button>
      </section>
    );
  }

  sendSave() {
    ///En caso de no haber seleccionado algún dato
    if (this.state.numInventario === "") {
      alert("Ingrese el id del Equipo");
    }
    else if (this.state.tipo === "") {
      alert("Ingrese el tipo de Equipo");
    }
    else if (this.state.marca === "") {
      alert("Ingrese la marca del Equipo");
    }
    else if (this.state.modelo === "") {
      alert("Ingrese el modelo del Equipo");
    }
    else if (this.state.numSerie === "") {
      alert("Ingrese el número de serie del Equipo");
    }
    else {
      //url backend
      const baseUrl = "http://localhost:3000/equipo/create";

      //parámetros de datos
      const datapost = {
        NumInventario: this.state.numInventario,
        Tipo: this.state.tipo,
        Marca: this.state.marca,
        Modelo: this.state.modelo,
        NumSerie: this.state.numSerie,
      }

      axios.post(baseUrl, datapost)
      .then(response => {
        if (response.data.success === true) {
          Swal.fire({
            icon: 'success',
            title: 'Registro de Equipo',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })

          this.limpiarCampos()
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Registro de Equipo',
          text: error,
          showConfirmButton: true,
        })
      })
    }
  }

  limpiarCampos() {
    this.setState({numInventario:""})
    this.setState({tipo:""})
    this.setState({marca:""})
    this.setState({modelo:""})
    this.setState({numSerie:""})
    this.render()
  }
}

export default Equipo;
